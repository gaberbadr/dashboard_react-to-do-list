// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProjectTasks from './pages/ProjectTasks';
import AddTask from './pages/AddTask';
import AddProject from './pages/AddProject';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);


  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=6')
      .then(response => response.json())
      .then(data => {
        const projectsData = data.products.map(item => ({
          id: item.id,
          title: item.title,
          body: item.description
        }));
        setProjects(projectsData);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);


  useEffect(() => {
    fetch('https://dummyjson.com/todos?limit=20')
      .then(response => response.json())
      .then(data => {
        const tasksData = data.todos.map(item => ({
          id: item.id,
          title: item.todo,
          description: `Task details for: ${item.todo}`,
          projectId: (item.id % 6) + 1,
          status: item.completed
            ? 'done'
            : item.id % 3 === 0
            ? 'progress'
            : 'todo'
        }));
        setTasks(tasksData);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <Router>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route
          path="/"
          element={<Dashboard projects={projects} tasks={tasks} />}
        />
        <Route
          path="/project/:id"
          element={
            <ProjectTasks
              projects={projects}
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />
        <Route
          path="/add-task"
          element={
            <AddTask
              projects={projects}
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />
        <Route
          path="/add-project"
          element={
            <AddProject
              projects={projects}
              setProjects={setProjects}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
