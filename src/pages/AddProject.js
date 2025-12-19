// pages/AddProject.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProject({ projects, setProjects }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProject = {
      id: Date.now(),
      title: formData.title,
      body: formData.body
    };

    setProjects([...projects, newProject]);
    navigate('/');
  };

  return (
    <div className="container">
      <h2 className="page-title">Add New Project</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Title:</label>
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
          <label>Project Description:</label>
          <textarea 
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Add Project</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;