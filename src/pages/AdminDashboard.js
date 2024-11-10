import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setContent, setCategories } from '../redux/adminSlice';
import { getUsers, getContent, getCategories, deactivateUser, approveContent, flagContent, createCategory } from '../services/api';
import { Button, Card, CardContent, Grid, Typography, TextField } from '@mui/material';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const content = useSelector((state) => state.admin.content);
  const categories = useSelector((state) => state.admin.categories);
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('users');
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersData = await getUsers();
        const contentData = await getContent();
        const categoriesData = await getCategories();

        if (usersData?.data) {
          dispatch(setUsers(usersData.data));
        }
        if (contentData?.data) {
          dispatch(setContent(contentData.data));
        }
        if (categoriesData?.data) {
          dispatch(setCategories(categoriesData.data));
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDeactivateUser = async (userId) => {
    try {
      setLoading(true);
      await deactivateUser(userId);
      const updatedUsers = await getUsers();
      dispatch(setUsers(updatedUsers?.data || []));
    } catch (error) {
      console.error('Error deactivating user:', error);
      setError('Error deactivating user');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveContent = async (contentId) => {
    try {
      setLoading(true);
      await approveContent(contentId);
      const updatedContent = await getContent();
      dispatch(setContent(updatedContent?.data || []));
    } catch (error) {
      console.error('Error approving content:', error);
      setError('Error approving content');
    } finally {
      setLoading(false);
    }
  };

  const handleFlagContent = async (contentId) => {
    try {
      setLoading(true);
      await flagContent(contentId);
      const updatedContent = await getContent();
      dispatch(setContent(updatedContent?.data || []));
    } catch (error) {
      console.error('Error flagging content:', error);
      setError('Error flagging content');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory) return; 
    try {
      setLoading(true);
      await createCategory({ name: newCategory });
      const updatedCategories = await getCategories();
      dispatch(setCategories(updatedCategories?.data || []));
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Error creating category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Buttons Container */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }} justifyContent="flex-start">
        <Grid item xs={12} sm="auto">
          <Button
            onClick={() => navigate(`/admin/users`)}
            variant="contained"
            color="primary"
            size="small"
            fullWidth
          >
            Go to Users
          </Button>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Button
            onClick={() => navigate(`/admin/content`)}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
          >
            Go to Content
          </Button>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Button
            onClick={() => navigate(`/admin/categories`)}
            variant="contained"
            color="success"
            size="small"
            fullWidth
          >
            Go to Categories
          </Button>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Button
            onClick={() => navigate('/')}
            variant="contained"
            color="info"
            size="small"
            fullWidth
          >
            Visit Site
          </Button>
        </Grid>
      </Grid>

      {/* Error Message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Conditional Rendering Based on Active Section */}
      {activeSection === 'users' && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Users</Typography>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <div key={user.id} style={{ marginBottom: '10px' }}>
                      <Typography>{user.username}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDeactivateUser(user.id)}
                        style={{ marginTop: '5px' }}
                      >
                        Deactivate
                      </Button>
                    </div>
                  ))
                ) : (
                  <Typography>No users available</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeSection === 'content' && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Content</Typography>
                {content && content.length > 0 ? (
                  content.map((item) => (
                    <div key={item.id} style={{ marginBottom: '10px' }}>
                      <Typography>{item.title}</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleApproveContent(item.id)}
                        style={{ marginTop: '5px', marginRight: '5px' }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleFlagContent(item.id)}
                        style={{ marginTop: '5px' }}
                      >
                        Flag
                      </Button>
                    </div>
                  ))
                ) : (
                  <Typography>No content available</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeSection === 'categories' && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Categories</Typography>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <Typography key={category.id} style={{ marginBottom: '10px' }}>
                      {category.name}
                    </Typography>
                  ))
                ) : (
                  <Typography>No categories available</Typography>
                )}
                <TextField
                  label="New Category"
                  variant="outlined"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  fullWidth
                  style={{ marginTop: '15px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleCreateCategory}
                  style={{ marginTop: '10px' }}
                >
                  Create Category
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AdminDashboard;
