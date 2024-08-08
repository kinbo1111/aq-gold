import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Loading from '../components/Loading';

export type PublicRouteProps =  {
  element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { isAuthenticated, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <Loading /> // Show a loading indicator while checking authentication
  }

  return isAuthenticated ? <Navigate to="/dashboard" state={{ from: location }} replace /> : element ;
};

export default PublicRoute;
