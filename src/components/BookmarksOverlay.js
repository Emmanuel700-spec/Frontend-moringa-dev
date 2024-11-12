// BookmarksOverlay.js
import React from "react";
import "./BookmarksOverlay.css";

const BookmarksOverlay = ({ onClose }) => (
  <div className="overlay bookmarks-overlay">
    <div className="overlay-content">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Bookmarks</h2>
      <p>Your bookmarks go here...</p>
    </div>
  </div>
);

export default BookmarksOverlay;
