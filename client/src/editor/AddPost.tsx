import React, { useEffect, useState } from 'react';
import {
  TextField,
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Collapse,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AddPost.module.css';  // Import the CSS module

// Define category interface
interface Category {
  _id: string;
  name: string;
}

// Default categories (in case of error fetching from API)
const defaultCategories = [
  { _id: '1', name: 'Technology' },
  { _id: '2', name: 'Lifestyle' },
  { _id: '3', name: 'Health' },
];

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/categories')
      .then((response) => {
        const fetchedCategories: Category[] = response?.data?.data || [];
        if (fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setCategories(defaultCategories); // Use default categories on error
        setErrorMessage('Failed to fetch categories. Using default categories.');
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      category: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add a post.');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:5000/api/posts/create',
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.status) {
          setOpenSnackbar(true);
          formik.resetForm();
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setErrorMessage(response.data.message || 'Failed to add post.');
        }
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className={styles.container} >
      <Card style={{
              width:500,
              border:50
            }}className={styles.card}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Create a New Post
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Collapse in>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              multiline
              rows={5}
              sx={{ mb: 3 }}
            />

            <FormControl
              fullWidth
              variant="outlined"
              sx={{ mb: 3 }}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {formik.errors.category}
                </Typography>
              )}
            </FormControl>
          </Collapse>

          <Box textAlign="right" mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} color="inherit" />}
            style={{
              backgroundColor: "orange",
              color: '#000',  // Text color black to contrast with yellow
              
            }}
          >
            {loading ? 'Posting...' : 'Add Post'}
          </Button>

          </Box>
        </form>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Post added successfully!
        </Alert>
      </Snackbar>

      {errorMessage && (
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={4000}
          onClose={() => setErrorMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default AddPost;
