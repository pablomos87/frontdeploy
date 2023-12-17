import "./CSS/AdminRegister.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import { faLock, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminRegister = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAdminRegister = async (e) => {
    e.preventDefault();
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.post(
        'https://back-proyecto-utn.onrender.com/admin/register',
        {
          name,
          password,
          confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );

      if (response.data.message === 'Administrador registrado exitosamente') {

        alert('Administrador registrado exitosamente')
        navigate(`/admin`);

      } else {

        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (

    <Container className="d-flex flex-column justify-content-center m-1">

      <div className="d-flex flex-column justify-content-center align-items-left container-fluid w-100">
        <h3 className="display-6 fw-bold pt-5">SIGNUP Admin</h3>
      </div>

      <Form onSubmit={handleAdminRegister} className="mt-5 bg-light p-4 w-100 mx-auto mb-5 ms-3 me-3">
        <Row>
          <Col className="mb-4 mt-4" md={12}>
            <FormGroup className="mb-4">
              <Col md={12} className="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon={faUserShield} className="me-2" />
                <FormControl
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingresa el nombre del administrador"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Col>

              <Col md={12} className="d-flex align-items-center">
                <FontAwesomeIcon icon={faLock} className="me-2" />
                <FormControl
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingresa la contraseña"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>

              <Col md={12} className="d-flex align-items-center mt-3">
                <FontAwesomeIcon icon={faLock} className="me-2" />
                <FormControl
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirma la contraseña"
                  className="form-control"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Col lg={4} md={6} sm={10} xs={10} className="d-flex justify-content-center container-sm">
          <Button variant="secondary" className="w-100 h-50" type='submit'>
            Registrarse
          </Button>
        </Col>
      </Form>
    </Container >
  );
};

export default AdminRegister;