import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBell, FaBookmark, FaUser } from "react-icons/fa";
import NotificationsOverlay from "./NotificationsOverlay";
import BookmarksOverlay from "./BookmarksOverlay";
import ProfileOverlay from "./ProfileOverlay";
import "./Navbar-user.css";

const Navbaruser = () => {
  const [activeOverlay, setActiveOverlay] = useState(null);

  const openOverlay = (overlay) => {
    setActiveOverlay(overlay);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <NavLink to="/">
            <img
              src="https://iconape.com/wp-content/png_logo_vector/moringa-school-logo.png"
              alt="Moringa logo"
              width="100"
              height="50"
            />
          </NavLink>
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/UserDashboard" className="navbar-item" activeClassName="active">
              FOR YOU
            </NavLink>
          </li>
          <li>
            <NavLink to="/DevOpsComponent" className="navbar-item" activeClassName="active">
              DEVOPS
            </NavLink>
          </li>
          <li>
            <NavLink to="/FullStackComponent" className="navbar-item" activeClassName="active">
              FULLSTACK
            </NavLink>
          </li>
          <li>
            <NavLink to="/FrontendComponent" className="navbar-item" activeClassName="active">
              FRONTEND
            </NavLink>
          </li>
          <li>
            <NavLink to="/BackendComponent" className="navbar-item" activeClassName="active">
              BACKEND
            </NavLink>
          </li>
          <li>
            <NavLink to="/CloudComputingComponent" className="navbar-item" activeClassName="active">
              CLOUD COMPUTING
            </NavLink>
          </li>
          <li className="icon" onClick={() => openOverlay("notifications")}>
            <FaBell />
          </li>
          <li className="icon" onClick={() => openOverlay("bookmarks")}>
            <FaBookmark />
          </li>
          <li className="icon" onClick={() => openOverlay("profile")}>
            <FaUser />
          </li>
        </ul>
      </div>

      {/* Render overlays conditionally without affecting navbar visibility */}
      {activeOverlay === "notifications" && <NotificationsOverlay onClose={closeOverlay} />}
      {activeOverlay === "bookmarks" && <BookmarksOverlay onClose={closeOverlay} />}
      {activeOverlay === "profile" && <ProfileOverlay onClose={closeOverlay} />}
    </nav>
  );
};

export default Navbaruser;
