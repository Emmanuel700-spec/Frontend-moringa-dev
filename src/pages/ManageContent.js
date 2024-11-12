import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContent } from '../redux/contentSlice';

const PostContent = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Fullstack',
    media_type: 'video',
    media_url: '',
  });

  const [feedback, setFeedback] = useState({
    message: '',
    success: null, // true for success, false for error
  });

  const [postedContent, setPostedContent] = useState(null); // To store and display the posted content

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset feedback before posting
    setFeedback({
      message: '',
      success: null,
    });

    // Persist the content to db.json via fetch API
    fetch('http://localhost:5000/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Dispatch Redux action after content is successfully posted
        dispatch(addContent(data));

        // Set success feedback and display the content
        setFeedback({
          message: 'Content posted successfully!',
          success: true,
        });

        // Store the posted content for display
        setPostedContent(data);
      })
      .catch((error) => {
        console.error('Error posting content:', error);
        setFeedback({
          message: 'Failed to post content. Please try again.',
          success: false,
        });
      });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    }}>
      <h2 style={{
        fontSize: '2rem',
        color: '#333',
        marginBottom: '1rem',
        textAlign: 'center',
      }}>Post New Content</h2>
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Title */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1rem', color: '#555', marginBottom: '0.5rem' }}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', margin: '0.3rem 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            placeholder="Enter the title of your content"
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1rem', color: '#555', marginBottom: '0.5rem' }}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', margin: '0.3rem 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', height: '120px' }}
            placeholder="Write a short description about your content"
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1rem', color: '#555', marginBottom: '0.5rem' }}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', margin: '0.3rem 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
          >
            <option value="Fullstack">Fullstack</option>
            <option value="Front-End">Front-End</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>

        {/* Media Type */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1rem', color: '#555', marginBottom: '0.5rem' }}>Media Type</label>
          <select
            name="media_type"
            value={formData.media_type}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', margin: '0.3rem 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
          >
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="article">Article</option>
          </select>
        </div>

        {/* Media URL */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1rem', color: '#555', marginBottom: '0.5rem' }}>Media URL</label>
          <input
            type="url"
            name="media_url"
            value={formData.media_url}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', margin: '0.3rem 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            placeholder="Enter the URL of the media"
          />
        </div>

        <button type="submit" style={{
          padding: '1rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          width: '100%',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          Post Content
        </button>
      </form>

      {/* Feedback Message */}
      {feedback.message && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: feedback.success ? '#4CAF50' : '#f44336',
          color: 'white',
          textAlign: 'center',
          borderRadius: '4px',
        }}>
          {feedback.message}
        </div>
      )}

      {/* Display Posted Content (YouTube-like format) */}
      {postedContent && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          width: '100%',
        }}>
          <h3 style={{ color: '#333' }}>{postedContent.title}</h3>
          <p>{postedContent.description}</p>
          <a href={postedContent.media_url} target="_blank" rel="noopener noreferrer">
            {postedContent.media_type === 'video' ? 'Watch Video' : 'Read Article'}
          </a>
        </div>
      )}
    </div>
  );
};

export default PostContent;
