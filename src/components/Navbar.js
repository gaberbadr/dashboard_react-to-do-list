// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo"> Task Manager</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/add-project" className="nav-link">+ New Project</Link>
      </div>
    </nav>
  );
}

export default Navbar;