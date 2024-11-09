// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import Navbar CSS
import logo from '../images/moringa-school-logo.png'; // Correct path to logo image

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Moringa School Logo" className="logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-item">Home</Link>
        </li>
        <li>
          <Link to="/contact" className="navbar-item">Contact Us</Link>
        </li>
        <li>
          <Link to="/login" className="navbar-item">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
