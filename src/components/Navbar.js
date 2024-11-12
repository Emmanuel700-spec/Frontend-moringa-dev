import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import Navbar CSS
import logo from '../images/moringa-school-logo.png'; // Correct path to logo image
import { Avatar, Tooltip, Popover, Button, TextField } from '@mui/material';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [profilePic, setProfilePic] = useState(null); // To store user's profile picture
  const [anchorEl, setAnchorEl] = useState(null); // For controlling the popover (dropdown)
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

  // Function to check login status from localStorage
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const role = localStorage.getItem('role');
    const profilePic = localStorage.getItem('profilePic');
    const email = localStorage.getItem('email');

    if (token && userName && role) {
      setIsLoggedIn(true);
      setUserName(userName);
      setRole(role);
      setProfilePic(profilePic); // Load profile picture
      setNewName(userName); // Set the current user name in the form field
      setNewEmail(email || ''); // Set the current email
      console.log("User is logged in:", userName);
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setRole('');
      setProfilePic(null);
      setNewName('');
      setNewEmail('');
      console.log("User is not logged in");
    }
  };

  // Check login status on component mount and whenever localStorage changes
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Handle login - set state when logging in
  const handleLogin = (userName, role) => {
    localStorage.setItem('token', 'sample-jwt-token');
    localStorage.setItem('role', role);
    localStorage.setItem('userName', userName);
    checkLoginStatus();
    navigate('/dashboard');
  };

  // Handle logout - clear state and redirect
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage items for simplicity
    checkLoginStatus();
    navigate('/login');
  };

  // Handle profile popover toggle
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to toggle the popover
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const open = Boolean(anchorEl);

  // Handle file upload for profile picture
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPicUrl = reader.result;
        setProfilePic(newPicUrl); // Update the profile picture state
        localStorage.setItem('profilePic', newPicUrl); // Store the new profile picture in localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle name and email changes
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleEmailChange = (e) => setNewEmail(e.target.value);

  // Save changes (name and email) to localStorage and update state
  const handleSaveChanges = () => {
    localStorage.setItem('userName', newName);
    localStorage.setItem('email', newEmail);
    setUserName(newName);
    alert('Profile updated!');
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Moringa School Logo" className="logo" />
        </Link>
      </div>

      {/* Conditionally render navbar content based on login status */}
      {isLoggedIn ? (
        <div className="navbar-logged-in">
          <span className="welcome-message">Welcome, {userName}</span>

          <div className="profile-actions">
            <Tooltip title="Profile">
              <Avatar
                alt={userName}
                src={profilePic || '/default-profile-pic.jpg'} // Default profile image if none set
                onClick={handleProfileClick}
                style={{ cursor: 'pointer' }}
              >
                {userName ? userName[0] : '?'}
              </Avatar>
            </Tooltip>

            {/* Popover for profile details */}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className="profile-popover">
                <div className="profile-header">
                  <Avatar
                    alt={userName}
                    src={profilePic || '/default-profile-pic.jpg'}
                    style={{ width: 80, height: 80, marginBottom: 10 }}
                  />
                  <h3>{userName}</h3>
                  <p>{role}</p>
                </div>

                <div className="profile-details">
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={newName}  
                    onChange={handleNameChange}
                    style={{ marginBottom: 10 }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={newEmail} 
                    onChange={handleEmailChange}
                    style={{ marginBottom: 20 }}
                  />

                  <div className="profile-actions">
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      style={{ marginBottom: 10 }}
                    >
                      Change Profile Picture
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleProfilePicChange}
                      />
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </Button>

                    {/* Logout Button */}
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={handleLogout}
                      style={{ marginTop: 10 }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </Popover>
          </div>
        </div>
      ) : (
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-item">Home</Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-item">Contact Us</Link>
          </li>
          <li>
            <Link to="/login" className="navbar-item">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
