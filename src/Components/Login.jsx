import { useNavigate, useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import axios from "axios";
import { Container, Col, Form, FormControl, FormGroup, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './CSS/Login.css';
import { useAuth } from '../AuthContext';



const Login = () => {

  const { setUsername: setParentUsername, setUserId, setIsAuthenticated, setAdminIsAuthenticated, setName, setAdminId} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  axios.defaults.withCredentials = true;
  


  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://back-proyecto-utn.onrender.com/users/login", {
        username: localUsername,
        password,
      });
  
      if (response.data && response.data.userToken) {
        const { userToken, userId } = response.data;
        
        console.log('El userToken es:', userToken);
        setAdminId('');
        setName('');
        setUserId(userId);
        setParentUsername(localUsername);
        setIsAuthenticated(true);
        setAdminIsAuthenticated(false);

        localStorage.removeItem('adminToken');
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', localUsername);
  
        console.log('Username actualizado:', localUsername);
        console.log('userId:', userId);
  
        navigate(location.state?.from || '/');
      } else {
        alert('Inicio de sesión fallido. Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert('Inicio de sesión fallido. Usuario o contraseña incorrectos.');
    }
  };

console.log('location.state:',  location.state);
  return (

    <Container fluid className="d-flex flex-column justify-content-center m-2">

      <div className="d-flex flex-column justify-content-center align-items-left container-fluid w-100">
        <h3 className="display-6 fw-bold mt-3 pb-0">LOGIN</h3>
        <p className="fw-normal"> Crea una cuenta y se parte de nuestra comunidad</p>
      </div>

      <Form onSubmit={handleLogin} className="mt-5 bg-light pt-4 pb-3 mb-4 ps-2 pe-2">

        <FormGroup className="mb-4 w-100 text-center pt-4 container-lg" >
        <Row className="mb-3">
  <Col md={8} sm={12} xs={12} className="d-flex align-items-center mx-auto">
    <FontAwesomeIcon icon={faUser} className="me-2" />
    <FormControl
      type="text"
      id="username"
      name="username"
      placeholder="Ingresa tu nombre de usuario"
      value={localUsername}
      onChange={(e) => setLocalUsername(e.target.value)}
      autoComplete="username"
      required
      className="w-100 mb-3" 
    />
  </Col>
  <Col md={8} sm={12} xs={12} className="d-flex align-items-center mx-auto">
    <FontAwesomeIcon icon={faLock} className="me-2" />
    <FormControl
      type="password"
      id="password"
      name="password"
      placeholder="Ingresa tu password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="current-password"
      required
      className="w-100" 
    />
  </Col>
</Row>
        </FormGroup>
        <Col lg={4} md={6} sm={10} xs={10} className="d-flex justify-content-center container-sm">
          <Button variant="secondary" className="w-100 h-50" type='submit'>
            Ingresar
          </Button>
        </Col>
        <p className="fs-6 mt-2 pt-4 text-end pe-3"> ¿Aún no tenés un usuario en esta página? <Link to="./signup"> Registrate aquí</Link> </p>

      </Form>
    </Container >

  );
}

export default Login