// src/components/ProtectedRoute.tsx

import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Loading from '../components/Loading';

const PrivateRoute: React.FC<{ element: React.ReactElement; }> = ({ element }) => {

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("userContext must be used within an AuthProvider!")
  }
  const { isAuthenticated, loading } = userContext;

  if (loading) {
    return <Loading />; 
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
