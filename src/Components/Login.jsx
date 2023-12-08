import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState} from "react";
import axios from "axios";
import { Container, Col, Form, FormControl, FormGroup, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';



const Login = ({ setIsAuthenticated, setUsername: setParentUsername, setUserId}) => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');

  axios.defaults.withCredentials = true;
  
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:9000/users/login", {
      username: localUsername,
      password,
    }, { withCredentials: true });
    console.log('Respuesta del servidor:', response.data);
    
    const receivedCookies = response.headers['set-cookie'];
    if (receivedCookies) {
      console.log('Cookies recibidas desde el servidor:', receivedCookies);
    }    
    console.log('Cookies almacenadas en el cliente:', document.cookie);

    if (response.data && response.data.message === 'Logeado correctamente') {
      setIsAuthenticated(true)
      setParentUsername(localUsername)
      setUserId(response.data.userId);
      console.log('Username actualizado:', localUsername);
      console.log('userId:', response.data.userId);
      
      navigate(location.state?.from || '/')
      
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert('Inicio de sesión fallido. Usuario o password incorrectos.');
  }
};

console.log('location.state:',  location.state);
  return (

    <Container fluid className="d-flex flex-column justify-content-center m-2">

      <div className="d-flex flex-column justify-content-center align-items-left container-fluid w-100">
        <h3 className="display-6 fw-bold mt-3 pb-0">LOGIN</h3>
        <p className="fw-normal"> Crea una cuenta y se parte de nuestra comunidad</p>
      </div>

      <Form onSubmit={handleLogin} className="mt-5 bg-light p-5">

        <FormGroup className="mb-4 w-75 mx-auto pt-4" >
        <Row className="mb-3">
  <Col md={12} className="d-flex align-items-center mb-3">
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
    />
  </Col>
  <Col md={12} className="d-flex align-items-center">
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
    />
  </Col>
</Row>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button variant="secondary" className="w-25 h-50" type='submit'>
            Ingresa
          </Button>
        </div>


      </Form>
    </Container >

  );
}

export default Login