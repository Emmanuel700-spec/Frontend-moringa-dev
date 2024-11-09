import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileCreation = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    role: '',
    profilePhoto: '',
    videosWatched: [],
    subscriptions: [],
  });

  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');

  const navigate = useNavigate();

  // Fetch categories from the server (or your JSON file)
  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle the comma-separated fields (videosWatched and subscriptions)
    if (name === 'videosWatched' || name === 'subscriptions') {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map((item) => item.trim()),
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare profile data (ensure arrays are properly formatted)
    const preparedData = {
      ...profileData,
      videosWatched: profileData.videosWatched.join(', '), // Join array as comma-separated string for saving
      subscriptions: profileData.subscriptions.join(', '), // Join array as comma-separated string for saving
    };

    // Save the profile data
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preparedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Profile created:', data);
        setFeedbackMessage('Profile created successfully!');
        setFeedbackType('success');
        setOpenSnackbar(true);

        // Redirect to the profile page after creation
        setTimeout(() => {
          navigate(`/profile/${data.id}`);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error creating profile:', error);
        setFeedbackMessage('Error creating profile. Please try again.');
        setFeedbackType('error');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Your Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          value={profileData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Bio"
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={profileData.role}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="techWriter">Tech Writer</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Profile Photo URL"
          name="profilePhoto"
          value={profileData.profilePhoto}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Create Profile
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={feedbackType} sx={{ width: '100%' }}>
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileCreation;
