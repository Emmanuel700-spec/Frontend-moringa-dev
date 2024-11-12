import React from 'react'; 
import './FullStack.css'; // Import external CSS file for styling
import Navbaruser from './Navbar';

const FullStackComponent = () => {
  return (
    <>
      <Navbaruser/>
      <div className="fullstack-container">
        <img 
          src="https://e1.pxfuel.com/desktop-wallpaper/982/350/desktop-wallpaper-development-full-stack-developer.jpg" // Replace with your image URL
          alt="Full Stack illustration" 
          className="fullstack-image" 
        />
        <div className="fullstack-text">
          <p>
            Full Stack development covers both front-end and back-end technologies. A full-stack developer works with databases, server-side programming, and client-side interfaces to create a complete web application.
          </p>
          <div className="buttons">
            <button>👍</button>
            <button>👎</button>
            <button>🔖</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullStackComponent;
