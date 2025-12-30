import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { isAuth } from './authServices/auth';
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuth()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
