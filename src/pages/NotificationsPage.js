import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { addNotification, removeNotification } from '../redux/notificationsSlice'; // Correct the import

const NotificationModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function
  const notifications = useSelector(state => state.notifications.notifications);

  const [lastUserFetch, setLastUserFetch] = useState([]);
  const [lastContentFetch, setLastContentFetch] = useState([]);
  const [lastCategoryFetch, setLastCategoryFetch] = useState([]);

  // Function to create a notification
  const createNotification = (message, type) => {
    const notification = {
      id: new Date().getTime(), // Unique ID based on timestamp
      message,
      type, // Could be 'info', 'success', 'warning', etc.
      timestamp: new Date().toLocaleString(),
    };
    dispatch(addNotification(notification));
  };

  const checkForUpdates = async () => {
    try {
      // Fetch users, content, and categories
      const usersRes = await axios.get('http://localhost:5000/users');
      const contentRes = await axios.get('http://localhost:5000/content');
      const categoriesRes = await axios.get('http://localhost:5000/categories');

      // Check if new users have been added
      if (usersRes.data.length > lastUserFetch.length) {
        createNotification('A new user has been added!', 'success');
      }

      // Check if new content has been approved
      if (contentRes.data.length > lastContentFetch.length) {
        createNotification('New content has been added or approved!', 'success');
      }

      // Check if new categories have been created
      if (categoriesRes.data.length > lastCategoryFetch.length) {
        createNotification('A new category has been created!', 'info');
      }

      // Update the last fetch states
      setLastUserFetch(usersRes.data);
      setLastContentFetch(contentRes.data);
      setLastCategoryFetch(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Poll every 5 seconds for updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkForUpdates();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [lastUserFetch, lastContentFetch, lastCategoryFetch]);

  // Handle remove notification
  const handleRemoveNotification = (id) => {
    dispatch(removeNotification({ id }));
  };

  // Handle notification click to navigate
  const handleNotificationClick = (notification) => {
    // Navigate to a new page based on the notification type or content
    if (notification.type === 'success') {
      navigate('/success-page'); // Redirect to a success page
    } else if (notification.type === 'info') {
      navigate('/info-page'); // Redirect to an info page
    }
    // Optionally, remove the notification after navigating
    handleRemoveNotification(notification.id);
  };

  // Handle Check Notifications button click
  const handleCheckNotifications = () => {
    navigate('/notifications'); // Navigate to a new notifications page
  };

  return (
    <div
      className="notification-modal"
      style={{
        position: 'fixed', // Make it fixed at the top
        top: '10%', // You can adjust this as needed (set distance from top of the page)
        right: '10%', // Position to the right side of the screen
        backgroundColor: 'white',
        width: '300px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: '9999', // Ensure it's above other elements like footer
        animation: 'slide-in 0.3s ease',
        overflowY: 'auto',
        maxHeight: '90vh', // Allow the modal to scroll if there are many notifications
      }}
    >
      <h3
        style={{
          fontSize: '20px',
          marginBottom: '15px',
          fontWeight: '600',
          color: '#333',
        }}
      >
        Notifications
      </h3>
      {notifications.length === 0 ? (
        <p style={{ color: '#555' }}>No new notifications</p>
      ) : (
        <div
          className="notification-list"
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification ${notification.type}`}
              style={{
                backgroundColor: notification.type === 'success' ? '#d4edda' : notification.type === 'info' ? '#cce5ff' : '#f8d7da',
                margin: '10px 0',
                padding: '12px 15px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
              onClick={() => handleNotificationClick(notification)} // Handle the click
            >
              <div>
                <p style={{ margin: '0', fontSize: '14px' }}>{notification.message}</p>
                <small style={{ color: '#888', fontSize: '12px' }}>{notification.timestamp}</small>
              </div>
              <button
                className="remove-notification-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering notification click
                  handleRemoveNotification(notification.id);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#d9534f',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ marginLeft: '5px' }}>X</span>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleCheckNotifications} // Handle the button click to navigate
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '15px',
        }}
      >
        Check Notifications
      </button>
    </div>
  );
};

export default NotificationModal;
