// src/layouts/AdminLayout.tsx
import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#6a5acd',
            color: 'white',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Admin Panel
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'white' }} />
        <List>
          <ListItem button onClick={() => handleNavigation('/admin')}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/admin/users')}>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/admin/posts')}>
            <ListItemText primary="Posts" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/admin/categories')}>
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
        <Divider sx={{ borderColor: 'white' }} />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f4f4f4',
          padding: 3,
          marginLeft: 0, // Removed spacing between sidebar and content
        }}
      >
        <Toolbar /> {/* Keeps content aligned with sidebar height */}
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
