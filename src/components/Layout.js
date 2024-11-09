import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 240 : 0,  // Shifts content to the right when sidebar is open
          transition: 'margin 0.3s ease',  // Smooth transition for shifting content
          padding: '16px',
        }}
      >
        {children}  {/* This will render your page content */}
      </Box>
    </Box>
  );
};

export default Layout;
