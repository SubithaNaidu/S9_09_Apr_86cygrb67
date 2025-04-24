import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CssBaseline,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  content: string;
  category: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddPost = () => {
    navigate('/add-post');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (token) {
      fetchPosts();
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to right, purple, white)' }}>
        <AppBar
          position="static"
          sx={{
            background: 'linear-gradient(to right,rgb(0, 0, 0),rgb(255, 255, 255))',
            boxShadow: 3,
            borderRadius: 0,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              📝 Content Management
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleAddPost}
                sx={{
                  mx: 1,
                  borderColor: '#fff',
                  color: '#fff',
                  '&:hover': {
                    borderColor: '#FF6F00',
                    color: '#FF6F00',
                  },
                }}
              >
                Add Post
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{
                  mx: 1,
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 5 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
            Welcome, {user.name || 'User'} 👋
          </Typography>

          {posts.length > 0 ? (
            <Box mt={4}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={3}
              >
                {posts.map((post) => (
                  <Card
                    key={post._id}
                    onClick={() => {
                      localStorage.setItem('post', post._id);
                      navigate(`/edit/${post._id}`);
                    }}
                    sx={{
                      cursor: 'pointer',
                      transition: '0.3s',
                      borderRadius: 2,
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-5px)',
                      },
                      '&:active': {
                        transform: 'translateY(2px)',
                      },
                    }}
                  >
                    <CardContent sx={{ padding: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: '#1e3c72', fontSize: '1.2rem' }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          mt: 1,
                          color: '#4f4f4f',
                          fontSize: '0.95rem',
                          height: '80px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {post.content}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          fontStyle: 'italic',
                          color: '#888',
                        }}
                      >
                        Category: {post.category?.name || 'N/A'}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          fontSize: '0.8rem',
                          fontWeight: 400,
                          color: '#aaa',
                        }}
                      >
                        Created At: {new Date(post.createdAt).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          ) : (
            <Typography mt={4} color="text.secondary" variant="body1">
              No posts available.
            </Typography>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Home;
