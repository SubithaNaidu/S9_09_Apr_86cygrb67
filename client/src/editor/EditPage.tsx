import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  CssBaseline,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  // Prefill form with passed state or fetch from API if refreshed
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const post = response.data.data;
        setFormData({
          title: post.title,
          content: post.content,
          category: post.category._id,
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const statePost = location.state?.post;
    if (statePost) {
      setFormData({
        title: statePost.title,
        content: statePost.content,
        category: statePost.category._id,
      });
    } else {
      fetchPost();
    }
  }, [id, location.state, token]);

  // Fetch categories (if needed for dropdown)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(to right, purple, white)',
      height: '150vh', 
    }}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
      <Card
    sx={{
      marginTop: '160px', 
      width: '100%', 
    }}
  >
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              ✏️ Edit Post
            </Typography>

            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                select
                fullWidth
                margin="normal"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-start', p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              sx={{ mr: 2 }}
            >
              Update Post
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDelete}
            >
              Delete Post
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
};

export default EditPost;
