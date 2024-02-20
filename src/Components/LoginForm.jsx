import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Form, FormControl, FormGroup, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserShield } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ onSubmit, isAdmin }) => {
  const [localUsername, setLocalUsername] = useState('');
  const [localAdminName, setLocalAdminName] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(isAdmin ? localAdminName : localUsername, password);
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3 bg-light pt-2 pb-5 mb-4 ps-2 pe-2">
      <FormGroup className="mb-4 w-100 text-center pt-2 container-lg">
        <Row className="mb-3 mt-5">
          <Col md={8} sm={12} xs={12} className="d-flex align-items-center mx-auto">
            <FontAwesomeIcon icon={isAdmin ? faUserShield : faUser} className="me-2" />
            <FormControl
              type="text"
              id={isAdmin ? "adminName" : "username"}
              name={isAdmin ? "adminName" : "username"}
              placeholder={isAdmin ? "Ingresa el nombre del administrador" : "Ingresa tu nombre de usuario"}
              value={isAdmin ? localAdminName : localUsername}
              onChange={(e) => isAdmin ? setLocalAdminName(e.target.value) : setLocalUsername(e.target.value)}
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
      {!isAdmin && (
          <p className="fs-6 mt-2 pt-4 text-end pe-3"> ¿Aún no tenés un usuario en esta página? <Link to="/signup/"> Registrate aquí</Link> </p>
        )}
    </Form>
  );
}

export default LoginForm;