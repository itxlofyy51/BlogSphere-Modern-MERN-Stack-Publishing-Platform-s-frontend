import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth';


const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5EFE6]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    )}
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!user.verified) {
    return <Navigate to="/verify-email" replace state={{ email: user.email }} />;
  }
  return  <Outlet />;;
};

export default ProtectedRoute;