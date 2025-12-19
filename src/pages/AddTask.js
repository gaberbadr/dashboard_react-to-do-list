
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask({ projects, tasks, setTasks }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    status: 'todo'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      projectId: parseInt(formData.projectId),
      status: formData.status
    };

    setTasks([...tasks, newTask]);
    navigate(`/project/${formData.projectId}`);// Redirect to the projectTasks page
  };

  return (
    <div className="container">
      <h2 className="page-title">Add New Task</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title:</label>
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Task Description:</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Select Project:</label>
          <select 
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Choose a project...</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="todo">To Do</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Add Task</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;