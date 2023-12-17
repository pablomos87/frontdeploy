import { Navigate } from 'react-router-dom';


export const ProtectedUserRoute = ({ children }) => {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const ProtectedAdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};



