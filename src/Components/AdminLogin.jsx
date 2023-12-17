import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Container, Col, Form, FormControl, FormGroup, Button, Row } from 'react-bootstrap';
import { faLock, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../AuthContext';


const AdminLogin = () => {

  const { setAdminIsAuthenticated, setIsAuthenticated, setName: setParentName, setAdminId, setUsername, setUserId } = useAuth();

  const navigate = useNavigate();

  const [localName, setLocalName] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://back-proyecto-utn.onrender.com/admin/login", {
        name: localName,
        password,
      });
  
      if (response.data && response.data.adminToken) {
        const { adminToken, adminId } = response.data;

        setUserId('');
        setUsername('');
        setAdminId(adminId);
        setParentName(localName);
        setAdminIsAuthenticated(true);
        setIsAuthenticated (false);
      
        localStorage.removeItem('userToken');
        localStorage.setItem('adminToken', adminToken);
        localStorage.setItem('adminId', adminId);
        localStorage.setItem('name', localName);
        navigate('/admin/');
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Nombre de usuario o contraseña incorrectos');
      } else {
        alert('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };
  
  return (

    <Container fluid className="d-flex flex-column justify-content-center m-2">

      <div className="mt-4 d-flex flex-column justify-content-center align-items-left container-fluid w-100">
        <h3 className="display-6 fw-bold pb-0">ADMIN LOGIN</h3>
      </div>

      <Form onSubmit={handleAdminLogin} className="mt-3 bg-light pt-2 pb-5 mb-4 ps-2 pe-2">

      <FormGroup className="mb-4 w-100 text-center pt-2 container-lg" >
<Row className="mb-3 mt-5">
<Col md={8} sm={12} xs={12} className="d-flex align-items-center mx-auto">
            <FontAwesomeIcon icon={faUserShield} className="me-2" />
            <FormControl
              type="text"
              id="name"
              name="name"
              placeholder="Ingresa el nombre de usuario"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              required 
              className="w-100 mb-3" />
              
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
              required 
              className="w-100"/>
          </Col>
        </Row>
        </FormGroup>
        <Col lg={4} md={6} sm={10} xs={10} className="d-flex justify-content-center container-sm">
          <Button variant="secondary" className="w-100 h-50" type='submit'>
            Ingresar
          </Button>
        </Col>

      </Form>
    </Container >

  );
}

export default AdminLogin