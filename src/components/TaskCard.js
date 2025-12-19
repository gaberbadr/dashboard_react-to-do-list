// components/TaskCard.js
import React from 'react';

function TaskCard({ task, onDelete, onMove }) {
  return (
    <div className="task-card">
      <h4 className="task-title">{task.title}</h4>
      <p className="task-desc">{task.description}</p>
      <div className="task-actions">
        {task.status !== 'todo' && (
          <button className="btn-small" onClick={() => onMove(task.id, 'todo')}>
            ← To Do
          </button>
        )}
        {task.status !== 'progress' && (
          <button className="btn-small" onClick={() => onMove(task.id, 'progress')}>
            ↔ Progress
          </button>
        )}
        {task.status !== 'done' && (
          <button className="btn-small" onClick={() => onMove(task.id, 'done')}>
            → Done
          </button>
        )}
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          🗑
        </button>
      </div>
    </div>
  );
}

export default TaskCard;