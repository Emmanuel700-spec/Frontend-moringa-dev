// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import Navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/contact" className="navbar-item">
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/My profile" className="navbar-item">
            My profile
          </Link>
        </li>
        <li>
          <Link to="/login" className="navbar-item">
            login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
