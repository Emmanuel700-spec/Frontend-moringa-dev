import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Button, Typography, CircularProgress, Divider, Box } from '@mui/material';
import { Check, Close, Flag, Delete } from '@mui/icons-material';
import { green, red, yellow, blueGrey } from '@mui/material/colors';

const ApproveContent = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching pending content for illustration
    const fetchContent = async () => {
      // For demo purposes, we simulate content data instead of fetching from an API
      const response = {
        data: [
          {
            id: 1,
            title: "Exciting New Features in React",
            description: "A post detailing the latest features in React 18.",
            status: "pending"
          },
          {
            id: 2,
            title: "Understanding JavaScript Closures",
            description: "An in-depth explanation of closures in JavaScript.",
            status: "pending"
          },
          {
            id: 3,
            title: "Suspicious Content in the Community",
            description: "A post containing suspicious content that may violate community guidelines.",
            status: "pending"
          }
        ]
      };
      setContentList(response.data);
      setLoading(false);
    };

    fetchContent();
  }, []);

  const handleApprove = async (contentId) => {
    try {
      setContentList(
        contentList.map((content) =>
          content.id === contentId ? { ...content, status: 'approved' } : content
        )
      );
    } catch (error) {
      console.error('Error approving content:', error);
    }
  };

  const handleReject = async (contentId) => {
    try {
      setContentList(contentList.filter((content) => content.id !== contentId));
    } catch (error) {
      console.error('Error rejecting content:', error);
    }
  };

  const handleFlag = async (contentId) => {
    try {
      setContentList(
        contentList.map((content) =>
          content.id === contentId ? { ...content, status: 'flagged' } : content
        )
      );
    } catch (error) {
      console.error('Error flagging content:', error);
    }
  };

  const handleRemove = async (contentId) => {
    try {
      setContentList(contentList.filter((content) => content.id !== contentId));
    } catch (error) {
      console.error('Error removing content:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Content Approval Dashboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : contentList.length > 0 ? (
        <List>
          {contentList.map((content) => (
            <React.Fragment key={content.id}>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: content.status === 'flagged' ? blueGrey[50] : 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  boxShadow: 2,
                  marginBottom: '15px',
                }}
              >
                <ListItemText
                  primary={<Typography variant="h6" color="textPrimary">{content.title}</Typography>}
                  secondary={<Typography variant="body2" color="textSecondary">{content.description}</Typography>}
                />
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                  Status: <strong>{content.status}</strong>
                </Typography>

                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<Check />}
                    onClick={() => handleApprove(content.id)}
                    disabled={content.status !== "pending"}
                    sx={{ flexGrow: 1 }}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Close />}
                    onClick={() => handleReject(content.id)}
                    disabled={content.status !== "pending"}
                    sx={{ flexGrow: 1 }}
                  >
                    Reject
                  </Button>

                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<Flag />}
                    onClick={() => handleFlag(content.id)}
                    disabled={content.status !== "pending"}
                    sx={{ flexGrow: 1 }}
                  >
                    Flag
                  </Button>
                </Box>

                {/* The "Remove" button will appear only when the content is flagged */}
                {content.status === 'flagged' && (
                  <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleRemove(content.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No content pending approval.</Typography>
      )}
    </Box>
  );
};

export default ApproveContent;
