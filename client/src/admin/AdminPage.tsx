import React from 'react';
import {
  Typography,
  Box,
  Container,
  Button,
  Card,
  CardContent,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
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
        <Box sx={{ py: 3, textAlign: 'center' }}>
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
          backgroundColor: '#f4f4f4',
          padding: 3,
          overflowY: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={5}>
            <Typography variant="h4" gutterBottom>
              Welcome to the Admin Panel
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Use the navigation sidebar to manage users, posts, and categories.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {/* Users */}
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Users</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Manage user accounts and roles.
                  </Typography>
                </CardContent>
                <Button onClick={() => handleNavigation('/admin/users')} sx={{ m: 1 }}>
                  Manage Users
                </Button>
              </Card>
            </Grid>

            {/* Posts */}
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Posts</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Manage posts shared on the platform.
                  </Typography>
                </CardContent>
                <Button onClick={() => handleNavigation('/admin/posts')} sx={{ m: 1 }}>
                  Manage Posts
                </Button>
              </Card>
            </Grid>

            {/* Categories */}
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Categories</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Organize content by editing categories.
                  </Typography>
                </CardContent>
                <Button onClick={() => handleNavigation('/admin/categories')} sx={{ m: 1 }}>
                  Manage Categories
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPage;
