import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function GuestRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate replace to='/' /> : children;
}

export default GuestRoute;
