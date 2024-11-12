import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Button, Grid, Box, Snackbar, Chip, IconButton, Tooltip, Modal, Paper } from '@mui/material';
import { CheckCircle, ReportProblem, Delete, PlayCircleFilled, Audiotrack, Visibility } from '@mui/icons-material';

const ManageContent = () => {
  const [content, setContent] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);

  const apiUrl = 'http://localhost:5000/content'; // Replace with your actual endpoint

  // Fetch content from the server
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching content:', error);
      });
  }, []);

  // Handle Approve Content
  const handleApprove = (id) => {
    const updatedContent = content.map(item =>
      item.id === id ? { ...item, status: 'Approved' } : item
    );
    setContent(updatedContent);
    axios.put(`${apiUrl}/${id}`, { ...updatedContent.find(item => item.id === id), status: 'Approved' })
      .then(() => {
        setSnackbarMessage('Content Approved');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error updating content:', error);
      });
  };

  // Handle Flag Content
  const handleFlag = (id) => {
    const updatedContent = content.map(item =>
      item.id === id ? { ...item, flagged: true, status: 'Flagged' } : item
    );
    setContent(updatedContent);
    axios.put(`${apiUrl}/${id}`, { ...updatedContent.find(item => item.id === id), flagged: true, status: 'Flagged' })
      .then(() => {
        setSnackbarMessage('Content Flagged');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error flagging content:', error);
      });
  };

  // Handle Remove Flagged Content
  const handleRemove = (id) => {
    setContent(content.filter(item => item.id !== id));
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        setSnackbarMessage('Flagged Content Removed');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error removing content:', error);
      });
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Handle Open Modal for Viewing Content
  const handleOpenModal = (contentItem) => {
    setCurrentContent(contentItem);
    setOpenModal(true);
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentContent(null);
  };

  // Function to extract YouTube video ID and format it into embed URL
  const getYouTubeEmbedUrl = (url) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/\S+|(?:v|e(?:mbed)?)\/([\w-]+))|youtu\.be\/([\w-]+))/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;  // Adding autoplay parameter to ensure it starts playing
    }
    return url; // Return original URL if it's not a YouTube link
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold' }}>
        Manage Content
      </Typography>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        sx={{ bottom: 20 }}
      />

      {/* Content list with scrollable area */}
      <Box
        sx={{
          maxHeight: '600px',  // Set a max height to enable scrolling
          overflowY: 'auto',   // Enable vertical scrolling when content overflows
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {content.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: 'white',
                '&:hover': { boxShadow: 10 },
                transition: 'box-shadow 0.3s ease-in-out',
              }}>
                <CardContent>
                  {/* Title */}
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {item.description}
                  </Typography>

                  {/* Media Preview */}
                  {item.type === 'video' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                      <Tooltip title="Watch Video">
                        <IconButton onClick={() => handleOpenModal(item)}>
                          <PlayCircleFilled fontSize="large" color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  {item.type === 'audio' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                      <audio controls>
                        <source src={item.mediaUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    </Box>
                  )}
                  {item.type === 'image' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        width="100%"
                        height="auto"
                        style={{ borderRadius: '8px', cursor: 'pointer' }}
                        onClick={() => handleOpenModal(item)}
                      />
                    </Box>
                  )}
                  {item.type === 'text' && (
                    <Typography variant="body2" color="textSecondary" paragraph sx={{ marginBottom: 2 }}>
                      {item.description}
                    </Typography>
                  )}

                  {/* Status Indicator */}
                  <Chip
                    label={item.status}
                    color={item.status === 'Approved' ? 'success' : item.status === 'Flagged' ? 'error' : 'warning'}
                    icon={item.status === 'Approved' ? <CheckCircle /> : item.status === 'Flagged' ? <ReportProblem /> : null}
                    sx={{ marginBottom: 2 }}
                  />

                  {/* Buttons */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(item.id)}
                      disabled={item.status !== 'Pending' || item.flagged}
                      fullWidth
                      sx={{
                        '&:hover': { backgroundColor: 'green', color: 'white' },
                        fontWeight: 'bold',
                      }}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleFlag(item.id)}
                      disabled={item.status !== 'Pending' || item.flagged}
                      fullWidth
                      sx={{
                        '&:hover': { backgroundColor: 'red', color: 'white' },
                        fontWeight: 'bold',
                      }}
                    >
                      Flag
                    </Button>

                    {item.flagged && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleRemove(item.id)}
                        fullWidth
                        sx={{
                          '&:hover': { backgroundColor: 'orange', color: 'white' },
                          fontWeight: 'bold',
                        }}
                      >
                        <Delete sx={{ marginRight: 1 }} />
                        Remove Content
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal for Viewing Content */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="content-modal-title"
        aria-describedby="content-modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '900px',
          maxHeight: '80vh', overflowY: 'auto', boxShadow: 24,
        }}>
          <Typography variant="h6" id="content-modal-title" gutterBottom sx={{ fontWeight: 'bold' }}>
            {currentContent?.title}
          </Typography>

          {/* Display content based on type */}
          {currentContent?.type === 'video' && (
            <iframe
              width="100%"
              height="auto"
              src={getYouTubeEmbedUrl(currentContent.mediaUrl)}
              title={currentContent.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {currentContent?.type === 'audio' && (
            <audio controls>
              <source src={currentContent.mediaUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
          {currentContent?.type === 'image' && (
            <img src={currentContent.mediaUrl} alt={currentContent.title} width="100%" height="auto" />
          )}
          {currentContent?.type === 'text' && (
            <Typography variant="body1" color="textSecondary" paragraph>
              {currentContent.description}
            </Typography>
          )}

          <Button variant="outlined" onClick={handleCloseModal} sx={{ marginTop: 2, fontWeight: 'bold' }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageContent;
