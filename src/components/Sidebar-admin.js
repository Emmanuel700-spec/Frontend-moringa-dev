import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Divider, List, ListItem, ListItemText } from '@mui/material';
import { ChevronLeft, ChevronRight, Dashboard, People, Category, Create, Description, Notifications } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const userRole = 'Admin'; // Can be 'Admin', 'TechWriter', or 'User'

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const renderAdminMenu = () => (
    <>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Dashboard sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Dashboard
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <People sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/admin/users" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Manage Users
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Category sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/admin/content" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Manage Content
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Category sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/admin/categories" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Manage Categories
          </Link>
        </ListItemText>}
      </ListItem>
    </>
  );

  const renderTechWriterMenu = () => (
    <>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Create sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/techwriter/profile" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Create Profile
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Category sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/techwriter/categories" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Manage Categories
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Description sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/techwriter/post-content" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Post Content
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Description sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/techwriter/approve-content" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Approve Content
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Description sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/techwriter/flagged-content" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Flagged Content
          </Link>
        </ListItemText>}
      </ListItem>
    </>
  );

  const renderUserMenu = () => (
    <>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Create sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/user/profile" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Create Profile
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Category sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/user/categories" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Subscribe to Categories
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Category sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/user/wishlist" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Wishlist
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Notifications sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/user/notifications" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            Notifications
          </Link>
        </ListItemText>}
      </ListItem>
      <ListItem button sx={{ paddingLeft: 2 }}>
        <Description sx={{ fontSize: '1.5rem' }} />
        {open && <ListItemText>
          <Link to="/user/content" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
            View Content
          </Link>
        </ListItemText>}
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Sidebar toggle button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: theme.palette.text.primary, // Ensure the icon is visible
            fontSize: '2rem',
          }}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>

      {/* Sidebar */}
      <div
        style={{
          flex: 1, // Make the sidebar take remaining space
          overflowY: 'auto',
          backgroundColor: theme.palette.background.paper,
          paddingTop: '10px',
          transition: 'width 0.3s ease', // Smooth transition for width change
          width: open ? '240px' : '60px', // Dynamically adjust the width based on the open state
        }}
      >
        <List>
          {renderMenu()}
        </List>
        <Divider />
      </div>
    </div>
  );
};

export default Sidebar;
