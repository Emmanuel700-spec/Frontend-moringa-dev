import React from 'react'; 
import './CloudComputing.css'; // Import external CSS file for styling
import Navbaruser from './Navbar';

const CloudComputingComponent = () => {
  return (
    <>
      <Navbaruser/>
      <div className="cloudcomputing-container">
        <img 
          src="https://c0.wallpaperflare.com/preview/697/898/445/cloud-computing-illustration-technology.jpg" // Replace with your image URL
          alt="Cloud Computing illustration" 
          className="cloudcomputing-image" 
        />
        <div className="cloudcomputing-text">
          <p>
            Cloud computing provides on-demand computing resources like servers, storage, and networking. It allows businesses to scale their infrastructure efficiently, reducing costs while increasing flexibility and reliability.
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

export default CloudComputingComponent;
