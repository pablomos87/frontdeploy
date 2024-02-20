import React from "react";
import { Container } from 'react-bootstrap';
import LoginForm from '../Components/LoginForm';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import handleUserLogin from '../Utils/userLoginUtils';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUsername: setParentUsername, setUserId, setIsAuthenticated, setAdminIsAuthenticated, setAdminName, setAdminId } = useAuth();

  const handleSubmit = async (localUsername, password) => {
    await handleUserLogin(localUsername, password, setAdminId, setAdminName, setUserId, setParentUsername, setIsAuthenticated, setAdminIsAuthenticated, navigate, location);
  };

  return(
  <Container fluid className="d-flex flex-column justify-content-center m-2">
  <div className="d-flex flex-column justify-content-center align-items-left container-fluid w-100">
    <h3 className="display-6 fw-bold mt-3 pb-0">LOGIN</h3>
    <p className="fw-normal">Ingresa a tu cuenta con tu nombre de usuario y contraseña</p>
  </div>

  <LoginForm onSubmit={handleSubmit} isAdmin={false}/>
  </Container>
  )};

export default Login;