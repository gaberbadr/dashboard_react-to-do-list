
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ project, tasksCount }) {
  const navigate = useNavigate();
  
  return (
    <div className="card">
      <h3 className="card-title">{project.title}</h3>
      <p className="card-desc">{project.body}</p>
      <div className="card-footer">
        <span className="task-count">{tasksCount} Tasks </span>
        <button 
          className="btn-primary"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          View Tasks
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;