import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Home,
  AccountCircle,
  PostAdd,
  Flag,
  Edit,
  Comment,
  Notifications,
  Category,
  PlaylistAdd,
  Menu,
  Close,
} from '@mui/icons-material';
import { useUser } from '../context/UserContext-admin'; // Ensure the context is properly set

const Sidebar = ({ setSidebarOpen }) => {
  const { userRole } = useUser(); // Extract userRole from context
  const [open, setOpen] = useState(false); // Sidebar open/close state
  const [activeLink, setActiveLink] = useState(''); // State to track active link

  // Function to handle active link styling
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setSidebarOpen(false); // Close the sidebar on link click
  };

  // Menu items for different roles
  const renderTechWriterMenu = () => (
    <>
      <ListItem button component={Link} to="/techwriter/home" onClick={() => handleLinkClick('techwriter/home')}>
        <ListItemIcon><Home /></ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/profile" onClick={() => handleLinkClick('techwriter/profile')}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Create Profile" />
      </ListItem>
      <ListItem button component={Link} to="/admin/categories" onClick={() => handleLinkClick('admin/manage-categories')}>
        <ListItemIcon><Category /></ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItem>
      <ListItem button component={Link} to="/admin/post-content" onClick={() => handleLinkClick('techwriter/post-content')}>
        <ListItemIcon><PostAdd /></ListItemIcon>
        <ListItemText primary="Post Content" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/approve-content" onClick={() => handleLinkClick('techwriter/approve-content')}>
        <ListItemIcon><Flag /></ListItemIcon>
        <ListItemText primary="Approve Content" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/edit-content" onClick={() => handleLinkClick('techwriter/edit-content')}>
        <ListItemIcon><Edit /></ListItemIcon>
        <ListItemText primary="Edit Content" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/review-content" onClick={() => handleLinkClick('techwriter/review-content')}>
        <ListItemIcon><Comment /></ListItemIcon>
        <ListItemText primary="Review Content" />
      </ListItem>
    </>
  );

  const renderAdminMenu = () => (
    <>
      <ListItem button component={Link} to="/admin/add-user" onClick={() => handleLinkClick('admin/add-user')}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Add User" />
      </ListItem>
      <ListItem button component={Link} to="/admin/flagged-content" onClick={() => handleLinkClick('admin/flagged-content')}>
        <ListItemIcon><Flag /></ListItemIcon>
        <ListItemText primary="Flagged Content" />
      </ListItem>
      <ListItem button component={Link} to="/admin/approve-content" onClick={() => handleLinkClick('admin/approve-content')}>
        <ListItemIcon><PostAdd /></ListItemIcon>
        <ListItemText primary="Approve Content" />
      </ListItem>
      <ListItem button component={Link} to="/admin/deactivate-user" onClick={() => handleLinkClick('admin/deactivate-user')}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Deactivate User" />
      </ListItem>
      <ListItem button component={Link} to="/admin/manage-categories" onClick={() => handleLinkClick('admin/manage-categories')}>
        <ListItemIcon><Category /></ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItem>
    </>
  );

  const renderUserMenu = () => (
    <>
      <ListItem button component={Link} to="/user/home" onClick={() => handleLinkClick('user/home')}>
        <ListItemIcon><Home /></ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/user/profile" onClick={() => handleLinkClick('user/profile')}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button component={Link} to="/user/post-content" onClick={() => handleLinkClick('user/post-content')}>
        <ListItemIcon><PostAdd /></ListItemIcon>
        <ListItemText primary="Post Content" />
      </ListItem>
      <ListItem button component={Link} to="/user/notifications" onClick={() => handleLinkClick('user/notifications')}>
        <ListItemIcon><Notifications /></ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItem>
      <ListItem button component={Link} to="/user/comments" onClick={() => handleLinkClick('user/comments')}>
        <ListItemIcon><Comment /></ListItemIcon>
        <ListItemText primary="Comments" />
      </ListItem>
      <ListItem button component={Link} to="/user/wishlist" onClick={() => handleLinkClick('user/wishlist')}>
        <ListItemIcon><PlaylistAdd /></ListItemIcon>
        <ListItemText primary="My Wishlist" />
      </ListItem>
    </>
  );

  // Render menu based on user role
  const renderMenu = () => {
    switch (userRole) {
      case 'Admin':
        return renderAdminMenu();
      case 'TechWriter':
        return renderTechWriterMenu();
      case 'User':
        return renderUserMenu();
      default:
        return (
          <ListItem>
            <ListItemText primary="No user role assigned" />
          </ListItem>
        );
    }
  };

  return (
    <>
      {/* Hamburger button */}
      <IconButton onClick={() => { setOpen(!open); setSidebarOpen(!open); }} sx={{ position: 'absolute', top: '16px', left: '16px', color: 'primary.main' }}>
        {open ? <Close /> : <Menu />}
      </IconButton>

      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={() => { setOpen(false); setSidebarOpen(false); }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#f5f5f5',
            boxShadow: 4,
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Moringa Daily.Dev
          </Typography>
          <IconButton onClick={() => { setOpen(false); setSidebarOpen(false); }}>
            <Close sx={{ color: 'grey.600' }} />
          </IconButton>
        </div>
        <Divider />
        <List sx={{ padding: 2 }}>
          {renderMenu()}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
