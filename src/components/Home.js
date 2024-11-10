import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Home.css';

// Directly import images at the top of the file
import dev1 from '../images/dev1.jpg';
import dev2 from '../images/dev2.jpg';
import dev3 from '../images/dev3.jpg';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Define images and their descriptions as a constant array
  const galleryItems = [
    {
      src: dev1,
      alt: 'Student working on a DevOps project',
      description:
        'This is a photo of our students who are doing DevOps engineering at Moringa School.',
    },
    {
      src: dev2,
      alt: 'Hands-on project focused on DevOps practices',
      description:
        'Another hands-on project focused on DevOps practices. This is part of our curriculum.',
    },
    {
      src: dev3,
      alt: 'Students graduating at Moringa School',
      description:
        'This is a photo of our students graduating at Moringa School, which is held twice a year.',
    },
  ];

  // Function to navigate to the Register page when the button is clicked
  const handleBrowseClick = () => {
    navigate('/register'); // Redirect to the Register page instead of signup
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-content">
          <h1>We are a School of Excellence in Technical Courses</h1>
          <button className="browse-button" onClick={handleBrowseClick}>
            Browse Our School
          </button>
          <p className="welcome-text">
            Welcome to Moringa School Daily Dev, your gateway to discovering
            insightful content about the tech world. Our community of passionate
            tech writers, alumni, and experts create engaging content in the
            form of blogs, articles, videos, and podcasts to inspire and
            educate.
          </p>
          {/* All information is shown without conditional rendering */}
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
        </div>
      </header>

      {/* Gallery section */}
      <div className="gallery">
        <h2>Our Gallery</h2>
        <div className="gallery-images">
          {galleryItems.map((item, index) => (
            <div key={index} className="gallery-item">
              <img
                src={item.src}  // Use the src from the constant array
                alt={item.alt}  // Use the alt text from the constant array
                className="gallery-img"
              />
              <p className="gallery-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
