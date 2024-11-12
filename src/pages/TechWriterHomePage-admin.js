import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid, Paper, Box, Divider } from '@mui/material';
import { AccountCircle, PostAdd, Flag, Edit, Comment, Category } from '@mui/icons-material';
import { useUser } from '../context/UserContext';
import { styled } from '@mui/system';

const TechWriterHomePage = () => {
  const { userRole } = useUser(); // Assuming the userRole is TechWriter

  // Example data (you should replace with dynamic data from your backend)
  const techWriterStats = {
    posts: 15,
    approvedContent: 10,
    flaggedContent: 3,
    categories: 5,
  };

  const BackgroundBox = styled(Box)({
    background: 'linear-gradient(to right, #2196f3, #64b5f6)',
    padding: '40px 20px',
    borderRadius: '8px',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  });

  const VideoBox = styled(Box)({
    marginTop: '20px',
    marginBottom: '40px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f7fb' }}>
      {/* Full Page Header Section */}
      <BackgroundBox>
        <Typography variant="h3" gutterBottom style={{ fontWeight: '700' }}>
          Welcome, Tech Writer!
        </Typography>
        <Typography variant="body1" style={{ fontSize: '18px', fontWeight: '500' }}>
          Explore, create, and contribute to the tech space with Moringa School's community-driven platform.
        </Typography>
      </BackgroundBox>

      {/* Profile Overview */}
      <Card style={{ margin: '20px 0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom style={{ color: '#1976d2' }}>
            Your Profile
          </Typography>
          <Link to="/techwriter/profile">
            <Button variant="contained" color="primary" startIcon={<AccountCircle />}>
              Edit Profile
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Content Management Overview */}
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Posts Created</Typography>
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>{techWriterStats.posts}</Typography>
              <Link to="/techwriter/post-content">
                <Button variant="contained" color="secondary" fullWidth startIcon={<PostAdd />}>
                  Create Content
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Approved Content</Typography>
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>{techWriterStats.approvedContent}</Typography>
              <Link to="/techwriter/approve-content">
                <Button variant="contained" color="secondary" fullWidth startIcon={<PostAdd />}>
                  Approve Content
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Flagged Content</Typography>
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>{techWriterStats.flaggedContent}</Typography>
              <Link to="/techwriter/flagged-content">
                <Button variant="contained" color="secondary" fullWidth startIcon={<Flag />}>
                  Flagged Content
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Categories</Typography>
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>{techWriterStats.categories}</Typography>
              <Link to="/techwriter/categories">
                <Button variant="contained" color="secondary" fullWidth startIcon={<Category />}>
                  Manage Categories
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Multimedia Section (Videos & Images) */}
      <VideoBox>
        <Typography variant="h6" gutterBottom style={{ fontWeight: '600' }}>
          Featured Tech Content
        </Typography>
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/AtozUZ_GZRw?si=xLmnMGi_mmHnd4oj"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </VideoBox>

      <Card style={{ marginBottom: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add Your Latest Post's Image
          </Typography>
          <img
            src="https://via.placeholder.com/1500x800?text=Tech+Content"  // Replace with your direct image URL
            alt="Tech Content"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              marginBottom: '10px',
            }}
          />
          <Typography variant="body1" color="textSecondary">
            Add engaging images to your posts to make them more appealing and visually interactive.
          </Typography>
        </CardContent>
      </Card>

      {/* Content Actions Overview */}
      <Typography variant="h6" gutterBottom style={{ color: '#1976d2', fontWeight: 'bold' }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="body1" gutterBottom>
              <Link to="/techwriter/edit-content">
                <Button fullWidth variant="outlined" color="primary" startIcon={<Edit />}>
                  Edit Content
                </Button>
              </Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Link to="/techwriter/review-content">
                <Button fullWidth variant="outlined" color="primary" startIcon={<Comment />}>
                  Review Content
                </Button>
              </Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Link to="/techwriter/review-comments">
                <Button fullWidth variant="outlined" color="primary" startIcon={<Comment />}>
                  Review Comments
                </Button>
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider style={{ margin: '20px 0' }} />

      {/* Notifications */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Recent Notifications
        </Typography>
        <Typography variant="body2" color="textSecondary">
          - New comment on your post about Front-End development.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          - Your content on Fullstack development has been approved.
        </Typography>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ mt: 'auto', backgroundColor: '#1976d2', color: 'white', padding: '10px 0' }}>
        <Typography variant="body2" align="center">
          © 2024 Moringa School. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default TechWriterHomePage;
