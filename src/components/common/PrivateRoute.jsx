import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const isUser = localStorage.getItem('userAuth') === 'true';
  const isAdmin = localStorage.getItem('adminAuth') === 'true';

  if (adminOnly && !isAdmin) {
    return <Navigate to="/auth/register" replace />;
  }

  if (!adminOnly && !isUser && !isAdmin) {
    return <Navigate to="/auth/register" replace />;
  }

  return children;
};

export default PrivateRoute;
