import React, { useEffect, useState } from 'react';

const DevOps = () => {
  const [devOpsData, setDevOpsData] = useState({
    title: 'Loading...',
    imageUrl: '',
    description: 'Please wait while we fetch the data...',
  });

  useEffect(() => {
    // Fetch data from db.json
    fetch('http://localhost:5000/devOps')  // Assuming you're running json-server at localhost:5000
      .then(response => response.json())
      .then(data => {
        setDevOpsData(data);  // Update state with the fetched data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {/* Conditionally render the content */}
      <h1>{devOpsData.title}</h1>
      {devOpsData.imageUrl && (
        <img 
          src={devOpsData.imageUrl}  // Dynamically use the image URL from the db.json
          alt="DevOps illustration"
          style={{ width: '100%', maxWidth: '600px', height: 'auto' }} 
        />
      )}
      <p>{devOpsData.description}</p>
    </div>
  );
};

export default DevOps;