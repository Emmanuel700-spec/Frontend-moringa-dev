import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { ThumbUpAlt } from '@mui/icons-material';
import axios from 'axios';

const ContentPage = () => {
  const { id } = useParams();  // Get the content ID from URL
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [viewCount, setViewCount] = useState(0); // To track the views

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/content/${id}`); // Fetch content by ID
        setContent(response.data);
        setComments(response.data.comments || []); // Assuming comments are part of content
        setViewCount(response.data.viewCount || 0); // Assuming viewCount is part of content
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    // Optionally, send like status to backend
    // Update the like count in the backend
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    // Handle subscription status
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newComments = [...comments, { text: newComment }];
      setComments(newComments);
      setNewComment('');
      // Optionally, send the new comment to the server
    }
  };

  const videoId = content?.videoUrl?.split('v=')[1]?.split('&')[0]; // Extract video ID from YouTube URL

  return (
    <Box style={{ padding: '20px' }}>
      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Content Display */}
      {!loading && !error && content && (
        <Box>
          <Typography variant="h4" gutterBottom>{content.title}</Typography>

          {/* Video Player */}
          {videoId && (
            <Box display="flex" justifyContent="center">
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={content.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          )}

          {/* Video Stats */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2">Views: {viewCount}</Typography>
            <Typography variant="body2">Likes: {content.likes}</Typography>
            <Typography variant="body2">Comments: {comments.length}</Typography>
          </Box>

          {/* Like and Subscribe buttons */}
          <Box mt={2}>
            <Button variant="contained" color={liked ? 'secondary' : 'primary'} onClick={handleLike}>
              <ThumbUpAlt /> {liked ? 'Unlike' : 'Like'}
            </Button>
            <Button variant="contained" color={subscribed ? 'secondary' : 'primary'} onClick={handleSubscribe} style={{ marginLeft: '10px' }}>
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </Box>

          {/* Comments Section */}
          <Box mt={3}>
            <Typography variant="h6">Comments</Typography>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>{comment.text}</ListItem>
              ))}
            </List>
            <TextField
              label="Add a Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleCommentSubmit} style={{ marginTop: '10px' }}>
              Submit Comment
            </Button>
          </Box>

          <Divider style={{ margin: '20px 0' }} />

          {/* Related Content (Optional) */}
          <Box mt={3}>
            <Typography variant="h6">Related Content</Typography>
            {/* You can fetch and display related content here */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ContentPage;
