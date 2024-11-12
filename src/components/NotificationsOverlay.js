// NotificationsOverlay.js
import React from "react";
import "./NotificationsOverlay.css";

const NotificationsOverlay = ({ onClose }) => (
  <div className="overlay notifications-overlay">
    <div className="overlay-content">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Notifications</h2>
      <p>Your notifications go here...</p>
    </div>
  </div>
);

export default NotificationsOverlay;
