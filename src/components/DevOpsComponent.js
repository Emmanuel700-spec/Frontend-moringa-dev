import React from 'react';  // Adjust the path to your image
import './DevOpsComponent.css'; // Import external CSS file for styling
import Navbaruser from './Navbar';
const DevOpsComponent = () => {
  return (
    <>
    <Navbaruser/>
    <div className="devops-container">
      <img 
        src="https://img.freepik.com/free-vector/isometric-devops-illustration_52683-84175.jpg?t=st=1731247150~exp=1731250750~hmac=581f38d2e1c82f8b75e2f0cae9cf8f4fddee50af073f33a3049b8060bd8e8add&w=740"
        alt="DevOps illustration" 
        className="devops-image" 
      />
      <div className="devops-text">
        <p>
          DevOps is a collaborative approach that merges software development and IT operations to streamline software delivery. 
          By promoting shared responsibility, automation, and CI/CD, DevOps enables faster and more reliable releases. 
          It involves practices like version control, automated testing, and infrastructure as code to enhance productivity and system reliability.
        </p>
        <div className='buttons'>
        <button>👍</button>
        <button>👎</button>
        <button>🔖</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default DevOpsComponent;
