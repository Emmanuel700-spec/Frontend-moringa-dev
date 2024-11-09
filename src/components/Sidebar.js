import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Divider, ListItemIcon, Box } from '@mui/material';
import { AccountCircle, PostAdd, Flag, Category, Notifications, Close, Menu } from '@mui/icons-material';

const Sidebar = () => {
  const [userRole] = useState('Admin'); // Mock current user role
  const [isOpen, setIsOpen] = useState(false); // Sidebar initially closed

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Render menu items based on user role
  const renderAdminMenu = () => (
    <>
      <ListItem button component={Link} to="/admin/dashboard">
        <ListItemIcon>
          <PostAdd sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/admin/users">
        <ListItemIcon>
          <AccountCircle sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItem>
      <ListItem button component={Link} to="/admin/content">
        <ListItemIcon>
          <Category sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Manage Content" />
      </ListItem>
      <ListItem button component={Link} to="/admin/categories">
        <ListItemIcon>
          <Category sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItem>
      <ListItem button component={Link} to="/admin/notifications">
        <ListItemIcon>
          <Notifications sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Check Notifications" />
      </ListItem>
    </>
  );

  const renderTechWriterMenu = () => (
    <>
      <ListItem button component={Link} to="/techwriter/profile">
        <ListItemIcon>
          <AccountCircle sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Create Profile" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/categories">
        <ListItemIcon>
          <Category sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/post-content">
        <ListItemIcon>
          <PostAdd sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Post Content" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/approve-content">
        <ListItemIcon>
          <PostAdd sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Approve Content" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/flagged-content">
        <ListItemIcon>
          <Flag sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Flagged Content" />
      </ListItem>
    </>
  );

  const renderUserMenu = () => (
    <>
      <ListItem button component={Link} to="/user/profile">
        <ListItemIcon>
          <AccountCircle sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Create Profile" />
      </ListItem>
      <ListItem button component={Link} to="/user/categories">
        <ListItemIcon>
          <Category sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Subscribe to Categories" />
      </ListItem>
      <ListItem button component={Link} to="/user/wishlist">
        <ListItemIcon>
          <Category sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Wishlist" />
      </ListItem>
      <ListItem button component={Link} to="/user/notifications">
        <ListItemIcon>
          <Notifications sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItem>
      <ListItem button component={Link} to="/user/content">
        <ListItemIcon>
          <PostAdd sx={{ color: 'primary.main' }} />
        </ListItemIcon>
        <ListItemText primary="View Content" />
      </ListItem>
    </>
  );

  const renderMenu = () => {
    switch (userRole) {
      case 'Admin':
        return renderAdminMenu();
      case 'TechWriter':
        return renderTechWriterMenu();
      case 'User':
        return renderUserMenu();
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hamburger Icon for Sidebar Toggle */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          display: isOpen ? 'none' : 'block', 
          position: 'absolute', 
          top: 16, 
          left: 16, 
          zIndex: 10, 
          padding: 0,  // Remove padding to prevent circle
          minWidth: 'auto', // Remove extra space around icon
          backgroundColor: 'transparent', // Remove background color
        }}
      >
        <Menu sx={{ fontSize: 30, color: '#000' }} />  {/* Adjust the font size for simplicity */}
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#f5f5f5',
            boxShadow: 4,
          },
        }}
      >
        {/* Sidebar header with close button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
            Admin Dashboard
          </Typography>
          <IconButton onClick={toggleSidebar} sx={{ color: '#000' }}>
            <Close />
          </IconButton>
        </div>
        <Divider sx={{ backgroundColor: '#34495E' }} />
        {/* Render Menu Based on User Role */}
        <List>
          {renderMenu()}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
