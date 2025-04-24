// src/pages/AdminUsersPage.tsx
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  TextField,
} from '@mui/material';
import axios from 'axios';
import AdminLayout from './AdminLayout';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users-with-posts');
        const sortedUsers = res.data.data.sort((a: User, b: User) =>
          a.name.localeCompare(b.name)
        );
        setUsers(sortedUsers);
      } catch (error: any) {
        console.error('Error fetching users:', error.response?.data?.message || error.message);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'purple', fontWeight: 'bold' }}>
            Admin Users
          </Typography>

          {/* Search Bar */}
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: 'purple', color: 'white', fontWeight: 'bold' }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ backgroundColor: 'purple', color: 'white', fontWeight: 'bold' }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ backgroundColor: 'purple', color: 'white', fontWeight: 'bold' }}>
                    Role
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id} sx={{ '&:hover': { backgroundColor: 'lightgray' } }}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminUsersPage;
