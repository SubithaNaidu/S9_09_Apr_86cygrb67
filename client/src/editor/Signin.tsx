import React from 'react';
import { Typography, TextField, Button, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundImage: 'url(https://source.unsplash.com/featured/?technology)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  width: '100%',
  borderRadius: '20px',
  padding: theme.spacing(4),
  boxShadow: '0px 10px 40px rgba(0,0,0,0.2)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
}));

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '', // Add confirmPassword to the form state
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', values);
        if (res.status) {
          alert(res.data.message);
          navigate('/login');
        }
      } catch (err: any) {
        alert(err.response?.data?.message || 'Signup failed');
      }
    },
  });

  return (
    <BackgroundBox sx={{
      background: 'linear-gradient(to right, purple, black)', // Orange to black gradient background
      p: 2,
    }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" fontWeight={700} gutterBottom align="center" color="purple">
            Create Account
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <Button style={{ background: 'purple' }}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Sign Up
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }} style={{ color: 'purple' }}>
            Already have an account?{' '}
            <Button variant="text" onClick={() => navigate('/login')} style={{ color: 'purple' }}>
              Login
            </Button>
          </Typography>
        </CardContent>
      </StyledCard>
    </BackgroundBox>
  );
};

export default Signin;
