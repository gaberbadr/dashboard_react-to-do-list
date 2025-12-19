
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';//useParams → تاخد الـ id من الـ URL (/project/1 → id = 1)
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from '../components/TaskCard';


function SortableTask({ task, onDelete, onMove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
  <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    <TaskCard task={task} onDelete={onDelete} onMove={onMove} />
  </div>
  );
}

function ProjectTasks({ projects, tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState(null);

const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  const projectTasks = tasks.filter(t => {
    const matchesProject = t.projectId === parseInt(id);
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const todoTasks = projectTasks.filter(t => t.status === 'todo');
  const progressTasks = projectTasks.filter(t => t.status === 'progress');
  const doneTasks = projectTasks.filter(t => t.status === 'done');

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleMove = (taskId, newStatus) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
  };

  const findContainer = (id) => {
    if (todoTasks.find(t => t.id === id)) return 'todo';
    if (progressTasks.find(t => t.id === id)) return 'progress';
    if (doneTasks.find(t => t.id === id)) return 'done';
    return null;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = over.data.current?.sortable?.containerId || findContainer(over.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setTasks(tasks.map(t => 
      t.id === active.id ? { ...t, status: overContainer } : t
    ));
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
  };

  if (!project) {
    return <div className="container"><h2>Project not found</h2></div>;
  }

  const renderColumn = (columnTasks, status, title, icon) => (
    <div className="column">
      <h3 className="column-title">{icon} {title} ({columnTasks.length})</h3>
      <SortableContext
        id={status}
        items={columnTasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="column-content" data-status={status}>
          {columnTasks.map(task => (
            <SortableTask
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );

  return (
    <div className="container">
      <div className="project-header">
        <h2 className="page-title">{project.title}</h2>
        <div className="header-actions">
          <input 
            type="text"
            placeholder=" Search tasks..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn-primary" onClick={() => navigate('/add-task')}>
            + Add Task
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="columns">
          {renderColumn(todoTasks, 'todo', 'To Do', '')}
          {renderColumn(progressTasks, 'progress', 'In Progress', '')}
          {renderColumn(doneTasks, 'done', 'Done', '')}
        </div>

        <DragOverlay>
          {activeId ? (
            <TaskCard
              task={tasks.find(t => t.id === activeId)}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default ProjectTasks;