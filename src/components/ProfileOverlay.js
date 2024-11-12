// ProfileOverlay.js
import React from "react";
import "./ProfileOverlay.css";

const ProfileOverlay = ({ onClose }) => (
  <div className="overlay profile-overlay">
    <div className="overlay-content">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>User Profile</h2>
      <p>Your profile information goes here...</p>
    </div>
  </div>
);

export default ProfileOverlay;
