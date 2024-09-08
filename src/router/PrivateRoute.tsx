// src/components/ProtectedRoute.tsx

import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Loading from '../components/Loading';

const PrivateRoute: React.FC<{ element: React.ReactElement; }> = ({ element }) => {

  const {isAuthenticated, loading} = useUser();

  if (loading) {
    return <Loading />; 
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
