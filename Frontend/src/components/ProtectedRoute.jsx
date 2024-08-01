import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("user"); // Example check

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
