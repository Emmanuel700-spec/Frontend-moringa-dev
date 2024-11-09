import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContentListPage = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all content for Tech Writers to edit
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/content'); // Adjust URL to match your backend endpoint
        setContentList(response.data);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleContentClick = (contentId) => {
    // Open the content in a new window (similar to opening a YouTube video)
    window.open(`/content/${contentId}`, '_blank');  // Opening the content in a new tab/window
  };

  return (
    <Box style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Content List</Typography>

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Content List */}
      {!loading && !error && (
        contentList.length > 0 ? (
          <Grid container spacing={3}>
            {contentList.map((content) => (
              <Grid item xs={12} sm={6} md={4} key={content.id}>
                <Card sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleContentClick(content.id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={content.thumbnailUrl || "https://via.placeholder.com/200"} // Placeholder if thumbnail is not available
                    alt={content.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{content.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {content.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No content available to edit.</Typography>
        )
      )}
    </Box>
  );
};

export default ContentListPage;
