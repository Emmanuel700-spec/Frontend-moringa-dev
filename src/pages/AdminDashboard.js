import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setContent, setCategories, setLoading, setError } from '../redux/adminSlice'; 
import axios from 'axios'; 
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin?.users || []);
  const content = useSelector((state) => state.admin?.content || []);
  const categories = useSelector((state) => state.admin?.categories || []);
  const loading = useSelector((state) => state.admin?.loading || false); 
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('users');
  const [newCategory, setNewCategory] = useState('');

  const [userCount, setUserCount] = useState(0);
  const [techWriterCount, setTechWriterCount] = useState(0);
  const [contentCount, setContentCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const usersData = await axios.get('http://localhost:5000/users');
        const contentData = await axios.get('http://localhost:5000/content');
        const categoriesData = await axios.get('http://localhost:5000/categories');

        if (isMounted) {
          dispatch(setUsers(usersData?.data || []));
          dispatch(setContent(contentData?.data || []));
          dispatch(setCategories(categoriesData?.data || []));
          
          setUserCount(usersData?.data.length || 0);
          setTechWriterCount(usersData?.data.filter(user => user.role === 'Tech Writer').length || 0);
          setContentCount(contentData?.data.length || 0);
          setAdminCount(usersData?.data.filter(user => user.role === 'Admin').length || 0);
        }
      } catch (error) {
        dispatch(setError(error.message || 'Error fetching data'));
        console.error('Error fetching data:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const handleApproveContent = async (contentId) => {
    try {
      await axios.patch(`http://localhost:5000/content/${contentId}`, { approved: true });
      const updatedContent = await axios.get('http://localhost:5000/content');
      dispatch(setContent(updatedContent?.data || []));
      setContentCount(updatedContent?.data.length || 0);
    } catch (error) {
      console.error('Error approving content:', error);
    }
  };

  const handleFlagContent = async (contentId) => {
    try {
      await axios.patch(`http://localhost:5000/content/${contentId}`, { flagged: true });
      const updatedContent = await axios.get('http://localhost:5000/content');
      dispatch(setContent(updatedContent?.data || []));
      setContentCount(updatedContent?.data.length || 0);
    } catch (error) {
      console.error('Error flagging content:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await axios.post('http://localhost:5000/categories', { name: newCategory });
      const updatedCategories = await axios.get('http://localhost:5000/categories');
      dispatch(setCategories(updatedCategories?.data || []));
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const navigateToSection = (section) => {
    setActiveSection(section);
    navigate(`/admin/${section}`);
  };

  const handleVisitSite = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Sidebar onSelectSection={setActiveSection} />
      <div style={{ marginLeft: 240, padding: '20px', width: '100%' }}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Admin Dashboard
        </Typography>

        {loading && <Typography>Loading...</Typography>} 
        
        <Grid container spacing={3} style={{ marginBottom: '20px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Users</Typography>
                <Typography variant="h5">{userCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Tech Writers</Typography>
                <Typography variant="h5">{techWriterCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Total Content</Typography>
                <Typography variant="h5">{contentCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">Admins</Typography>
                <Typography variant="h5">{adminCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button 
              onClick={() => navigateToSection('users')} 
              variant="contained" 
              color="primary"
              fullWidth
              style={{ backgroundColor: '#1976d2', borderRadius: '4px' }}
            >
              Go to Users
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button 
              onClick={() => navigateToSection('content')} 
              variant="contained" 
              color="secondary"
              fullWidth
              style={{ backgroundColor: '#9c27b0', borderRadius: '4px' }}
            >
              Go to Content
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button 
              onClick={() => navigateToSection('categories')} 
              variant="contained" 
              color="success"
              fullWidth
              style={{ backgroundColor: '#4caf50', borderRadius: '4px' }}
            >
              Go to Categories
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          <Grid item xs={12}>
            <Button 
              onClick={handleVisitSite} 
              variant="contained" 
              color="info"
              fullWidth
              style={{ backgroundColor: '#00bcd4', borderRadius: '4px' }}
            >
              Visit Site
            </Button>
          </Grid>
        </Grid>

        {activeSection === 'users' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                <CardContent>
                  <Typography variant="h6">Users Statistics</Typography>
                  <Typography>Total Users: {userCount}</Typography>
                  <Typography>Tech Writers: {techWriterCount}</Typography>
                  <Typography>Admins: {adminCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
