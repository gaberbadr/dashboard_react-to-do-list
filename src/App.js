// // App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';
// import ProjectTasks from './pages/ProjectTasks';
// import AddTask from './pages/AddTask';
// import AddProject from './pages/AddProject';
// import './App.css';

// function App() {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);

//   // جلب المشاريع من API
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
//       .then(response => response.json())
//       .then(data => {
//         const projectsData = data.map(item => ({
//           id: item.id,
//           title: item.title,
//           body: item.body.substring(0, 100) + '...'
//         }));
//         setProjects(projectsData);
//       });
//   }, []);

//   // جلب المهام من API
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
//       .then(response => response.json())
//       .then(data => {
//         const tasksData = data.map(item => ({
//           id: item.id,
//           title: item.title,
//           description: 'Task description here',
//           projectId: (item.id % 6) + 1,
//           status: item.completed ? 'done' : 'todo'
//         }));
//         setTasks(tasksData);
//       });
//   }, []);

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Dashboard projects={projects} tasks={tasks} />} />
//         <Route path="/project/:id" element={<ProjectTasks projects={projects} tasks={tasks} setTasks={setTasks} />} />
//         <Route path="/add-task" element={<AddTask projects={projects} tasks={tasks} setTasks={setTasks} />} />
//         <Route path="/add-project" element={<AddProject projects={projects} setProjects={setProjects} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


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


  // جلب المشاريع من DummyJSON API
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=5')
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


  // جلب المهام من DummyJSON API
  useEffect(() => {
    fetch('https://dummyjson.com/todos?limit=20')
      .then(response => response.json())
      .then(data => {
        const tasksData = data.todos.map(item => ({
          id: item.id,
          title: item.todo,
          description: `Task details for: ${item.todo}`,
          projectId: (item.id % 6) + 1, // توزيع المهام على المشاريع
          status: item.completed ? 'done' : (item.id % 3 === 0 ? 'progress' : 'todo')
        }));
        setTasks(tasksData);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard projects={projects} tasks={tasks} />} />
        <Route path="/project/:id" element={<ProjectTasks projects={projects} tasks={tasks} setTasks={setTasks} />} />
        <Route path="/add-task" element={<AddTask projects={projects} tasks={tasks} setTasks={setTasks} />} />
        <Route path="/add-project" element={<AddProject projects={projects} setProjects={setProjects} />} />
      </Routes>
    </Router>
  );
}

export default App;