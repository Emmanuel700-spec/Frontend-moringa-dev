
import React from "react";
import "../style/Sidenav.css"; // Import the CSS
import "../style/Categories.css"
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="Sidenav">
      <h1>Activities</h1>
      <ul className="side-menu">
        <li><Link to="/subscribed">Subscribed categories</Link></li>
        <li><Link to="/content">Content</Link></li>
      </ul>
    </div>
  );
}

export default Sidenav;
