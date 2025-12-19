// pages/Dashboard.js
import React from 'react';
import ProjectCard from '../components/ProjectCard';

function Dashboard({ projects, tasks }) {
  const getTasksCount = (projectId) => {
    return tasks.filter(task => task.projectId === projectId).length;
  };

  return (
    <div className="container">
      <h2 className="page-title">My Projects</h2>
      <div className="grid">
        {projects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project}
            tasksCount={getTasksCount(project.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;