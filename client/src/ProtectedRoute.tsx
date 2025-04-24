import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  try {
    const parsedUser = JSON.parse(user);
    const userRole = parsedUser.role;

    if (!allowedRoles.includes(userRole)) {
      // Redirect based on role if not allowed
      if (userRole === 'user') return <Navigate to="/" replace />;
      if (userRole === 'admin') return <Navigate to="/admin" replace />;
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Error parsing user:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
