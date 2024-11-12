import React from 'react';
import './Backend.css'; // Import external CSS file for styling
import Navbaruser from './Navbar';  // Adjusted import path

const BackendComponent = () => {
  return (
    <>
      <Navbaruser />
      <div className="backend-container">
        <img 
          src="https://img.freepik.com/free-vector/backend-technology-concept-with-glowing-lines-background_1017-28405.jpg?t=st=1731248243~exp=1731251843~hmac=d2e4fd72fd6e7045adbe3f53f8b9a797530c72ffc42252301f8555cbad30fa2f&w=740" // Replace with your image URL
          alt="Backend illustration" 
          className="backend-image" 
        />
        <div className="backend-text">
          <p>
            Backend development involves creating the server-side part of a web application. It includes working with databases, server-side scripting, APIs, and application logic to ensure functionality and security.
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

export default BackendComponent;
