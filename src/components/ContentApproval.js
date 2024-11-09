import React, { useState, useEffect } from 'react';
import PostContentForm from './PostContentForm'; // Import the PostContentForm component

const ContentApproval = () => {
  const [content, setContent] = useState([]); // Store all content (user and Tech Writer)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle form for posting content
  const [editingContent, setEditingContent] = useState(null); // Content being edited
  const [editForm, setEditForm] = useState({ title: '', description: '' }); // Form for editing content

  // Fetch content from backend
  useEffect(() => {
    fetch('http://localhost:5000/content') // Replace with your backend endpoint
      .then((response) => response.json())
      .then((data) => {
        setContent(data); // Populate with all content
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching content:', error);
        setLoading(false);
        setError(error.message);
      });
  }, []);

  // Handle posting content by Tech Writer
  const handleNewContentPosted = (newContent) => {
    setContent((prevContent) => [newContent, ...prevContent]); // Add new content to front

    // Send a POST request to add new content to db.json
    fetch('http://localhost:5000/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContent),
    })
      .then((response) => response.json())
      .then((addedContent) => {
        console.log('New content posted:', addedContent);
      })
      .catch((error) => {
        console.error('Error posting :', error);
      });
  };

  // Handle approving content posted by users
  const handleApprove = (id) => {
    setContent((prevContent) =>
      prevContent.map((item) =>
        item.id === id ? { ...item, status: 'Approved' } : item
      )
    );

    // Update content status in the backend
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Approved' }),
    })
      .then((response) => response.json())
      .then((updatedContent) => {
        console.log('Content approved:', updatedContent);
      })
      .catch((error) => {
        console.error('Error approving content:', error);
      });
  };

  // Handle rejecting content posted by users
  const handleReject = (id) => {
    setContent((prevContent) =>
      prevContent.map((item) =>
        item.id === id ? { ...item, status: 'Rejected' } : item
      )
    );

    // Update content status in the backend
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Rejected' }),
    })
      .then((response) => response.json())
      .then((updatedContent) => {
        console.log('Content rejected:', updatedContent);
      })
      .catch((error) => {
        console.error('Error rejecting content:', error);
      });
  };

  // Handle flagging content posted by users as violating rules
  const handleFlag = (id) => {
    setContent((prevContent) =>
      prevContent.map((item) =>
        item.id === id ? { ...item, flagged: true } : item
      )
    );

    // Update flagged content in the backend
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flagged: true }),
    })
      .then((response) => response.json())
      .then((updatedContent) => {
        console.log('Content flagged:', updatedContent);
      })
      .catch((error) => {
        console.error('Error flagging content:', error);
      });
  };

  // Handle toggling form for posting new content
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Render content posted by users that need approval
  const renderContent = () => {
    if (loading) {
      return <p>Loading content...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (content.length === 0) {
      return <p>No content available for approval.</p>;
    }

    return (
      <ul>
        {content.map((item) => (
          <li key={item.id} className={item.flagged ? 'flagged' : ''}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Status: {item.status}</p>

            {/* Approve/Reject/Flag Buttons for user-submitted content */}
            {item.author !== 'Tech Writer' && ( // Ensure only Tech Writer can approve/reject/flag user content
              <>
                <button onClick={() => handleApprove(item.id)} disabled={item.status === 'Approved'}>
                  Approve
                </button>
                <button onClick={() => handleReject(item.id)} disabled={item.status === 'Rejected'}>
                  Reject
                </button>
                <button className="flag-btn" onClick={() => handleFlag(item.id)} disabled={item.flagged}>
                  Flag as Violating Rules
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="content-approval">
      <h2>Content Approval</h2>

      {/* Button to toggle the PostContentForm */}
      <button onClick={toggleForm} className="post-content-btn">
        {showForm ? 'Cancel Posting' : 'Post New Content'}
      </button>

      {/* Show form to post new content */}
      {showForm && <PostContentForm onContentPosted={handleNewContentPosted} />}

      {/* Render content for approval */}
      {renderContent()}
    </div>
  );
};

export default ContentApproval;