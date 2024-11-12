import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Snackbar, MuiAlert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    role: '',
    profilePhoto: '',
    videosWatched: [],
    subscriptions: [],
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');
  const navigate = useNavigate();

  // Fetch the current profile data to edit
  useEffect(() => {
    fetch(`http://localhost:5000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Error fetching profile data:', error));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the profile data in the server
    fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedbackMessage('Profile updated successfully!');
        setFeedbackType('success');
        setOpenSnackbar(true);

        // Redirect to the profile page after update
        setTimeout(() => {
          navigate(`/profile/${data.id}`);
        }, 2000);
      })
      .catch((error) => {
        setFeedbackMessage('Error updating profile. Please try again.');
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
        Edit Your Profile
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
        <TextField
          label="Profile Photo URL"
          name="profilePhoto"
          value={profileData.profilePhoto}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Videos Watched"
          name="videosWatched"
          value={profileData.videosWatched}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subscriptions"
          name="subscriptions"
          value={profileData.subscriptions}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit">
          Update Profile
        </Button>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={feedbackType} sx={{ width: '100%' }}>
          {feedbackMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default ProfileEdit;
