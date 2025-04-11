import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a simplified PrivateRoute component. In a real app, you would check 
// authentication state from a context or Redux store
const PrivateRoute = ({ children }) => {
  // Simulate checking if user is logged in - replace with actual auth logic
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  // Render the protected component if authenticated
  return children;
};

export default PrivateRoute; 