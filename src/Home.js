import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [showContent, setShowContent] = useState(false);

  const handleBrowseClick = () => {
    navigate("/signup"); // Navigate to the signup page
    setShowContent(!showContent); // Toggle the visibility of additional content
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-content">
          <h1>We are a School of Excellence in Technical Courses</h1>
          <button className="browse-button" onClick={handleBrowseClick}>
            {showContent ? "Hide Details" : "Browse Our School"} {/* Toggle button text */}
          </button>
          <p className="welcome-text">
            Welcome to Moringa School Daily Dev, your gateway to discovering
            insightful content about the tech world. Our community of passionate
            tech writers, alumni, and experts create engaging content in the
            form of blogs, articles, videos, and podcasts to inspire and
            educate.
          </p>
          {showContent && (
            <div className="extra-content">
              <h3>About Moringa School</h3>
              <p>
                Moringa School is a leading institution offering top-notch
                technical courses in full-stack development, DevOps, and other
                essential tech fields. With our rigorous curriculum and
                real-world projects, we empower students to launch successful
                careers in technology.
              </p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Home;
