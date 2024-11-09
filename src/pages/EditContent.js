import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Alert,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditContent = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null); // Store selected content for editing
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

  const handleEditClick = (content) => {
    // Set selected content for editing
    setSelectedContent(content);
  };

  const handleClose = () => {
    // Close the edit form
    setSelectedContent(null);
  };

  const handleSave = async () => {
    try {
      // Send updated data to the server
      await axios.put(`http://localhost:5000/content/${selectedContent.id}`, selectedContent);
      setContentList((prevContentList) =>
        prevContentList.map((content) =>
          content.id === selectedContent.id ? selectedContent : content
        )
      );
      handleClose();
    } catch (err) {
      console.error('Error updating content:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  return (
    <Box style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Edit Content</Typography>

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
                <Card sx={{ position: 'relative' }}>
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
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(content)}
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                    aria-label={`Edit ${content.title}`}
                  >
                    <Edit />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No content available to edit.</Typography>
        )
      )}

      {/* Edit Content Dialog */}
      <Dialog open={Boolean(selectedContent)} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Content</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={selectedContent?.title || ''}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={selectedContent?.description || ''}
            onChange={handleChange}
          />
          <TextField
            label="Category"
            name="category"
            fullWidth
            margin="normal"
            value={selectedContent?.category || ''}
            onChange={handleChange}
          />
          <TextField
            label="Media Type"
            name="media_type"
            fullWidth
            margin="normal"
            value={selectedContent?.media_type || ''}
            onChange={handleChange}
          />
          <TextField
            label="Media URL"
            name="media_url"
            fullWidth
            margin="normal"
            value={selectedContent?.media_url || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditContent;
