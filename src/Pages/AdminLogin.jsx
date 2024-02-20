import React from "react";
import { Container } from 'react-bootstrap';
import LoginForm from '../Components/LoginForm';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import handleAdminLogin from '../Utils/adminLoginUtils';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAdminIsAuthenticated, setIsAuthenticated, setAdminName, setAdminId, setUsername, setUserId  } = useAuth();

  const handleSubmit = async (localAdminName, password) => {
    await handleAdminLogin(localAdminName, password, setAdminId, setAdminName, setUserId, setUsername, setIsAuthenticated, setAdminIsAuthenticated, navigate);
    setAdminName(localAdminName); // actualiza el nombre de administrador en el estado global
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center m-2">
    <div className="mt-4 d-flex flex-column justify-content-center align-items-left container-fluid w-100">
      <h3 className="display-6 fw-bold pb-0">ADMIN LOGIN</h3>
    </div>
    <LoginForm onSubmit={handleSubmit} isAdmin={true} />;
    </Container>
  )
};

export default AdminLogin;