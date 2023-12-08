import "./CSS/Signup.css";
import { useNavigate} from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, FormLabel, FormControl, FormGroup, Button } from 'react-bootstrap';

const Signup = () => {

  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:9000/users/register', {
        username,
        password,
        confirmPassword,
        email,
        confirmEmail,
        gender,
        country,
        city,
        firstName,
        lastName,
        birthDate
      });

      if (response.data.message === 'Registrado exitosamente') { 

        navigate(`/signup-success`) 
        
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
        <h3 className="display-6 fw-bold pb-0">SIGN UP</h3>
        <p className="fw-normal"> Crea una cuenta y se parte de nuestra comunidad</p>
      </div>

      <Form className="mt-5 bg-light p-4 w-100 mx-auto">
        <Row>
          <Col className="mb-4" md={12}>
            <FormGroup className="mb-4">
              <Row>
                <Col className="justify-content-center">
                  <FormLabel htmlFor="nombreUsuario" className="me-3">Nombre: </FormLabel>
                  <FormControl
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Ingresa tu nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <FormLabel htmlFor="apellidoUsuario" className="me-3 align-items-center justify-content-center">Apellido:</FormLabel>
                  <FormControl
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Ingresa tu apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
       
        <Row>
  <Col className="mb-4" md={12}>
    <FormGroup className="mb-4">
      <Col className="d-flex flex-column align-items-center">
        <Row className="w-50">        
          <Form.Label htmlFor="username" className="me-3">Usuario:</Form.Label>
        <FormControl
          className="w-100"
          type="text"
          id="username"
          name="username"
          placeholder="Ingresa tu usuario"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </Row>
      </Col>
      
    </FormGroup>
  </Col>
</Row>

        <Row>
          <Col className="mb-4" md={12}>
            <FormGroup className="mb-4">
              <Row>
                <Col className="justify-content-center">
                  <FormLabel htmlFor="city" className="me-3">Ciudad</FormLabel>
                  <FormControl
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ingresa tu ciudad"
                    className="form-control"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
                <Col className="justify-content-center">
                  <FormLabel htmlFor="country">Pais</FormLabel>
                  <FormControl
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Ingresa tu pais"
                    className="form-control"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="mb-4" md={12}>
            <FormGroup className="mb-4">
              <Row>
                <Col className="justify-content-center">
                  <FormLabel htmlFor="brthDat">Fecha de nacimiento</FormLabel>
                  <FormControl
                    type="date"
                    id="brthDat"
                    name="brthDate"
                    placeholder="Ingresa tu fecha de nacimiento"
                    className="form-control"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)} />
                </Col>

                  <Col className="justify-content-center">
                    <FormLabel htmlFor="gender">Género</FormLabel>
                    <Form.Select
                      id="gender"
                      name="gender"
                      className="form-control"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Elige una opción</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </Form.Select>
                  </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>

          <Row>
          <Col className="mb-4" md={12}>
            <FormGroup className="mb-4">
              <Row>
                <Col className="justify-content-center">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu email"
                className="form-control"
                autocomplete="current-password"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             </Col>

             <Col className="justify-content-center">
                    <FormLabel htmlFor="confirmEmail">Confirmar email</FormLabel>
                  <FormControl
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                placeholder="Confirma tu email"
                className="form-control"
                required
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
          </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>

     

        <Row>
          <Col className="mb-4" md={12}>
            <FormGroup className="mb-4">
              <Row>
                <Col className="justify-content-center">
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <FormControl
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
             </Col>

<Col className="justify-content-center">
       <FormLabel htmlFor="confirmPassword">Confirmar contraseña</FormLabel>
                  <FormControl
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma tu password"
                className="form-control"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
          </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
  <Button variant="secondary" className="w-25 h-50" onClick={handleSignup}>
    Registrarse
  </Button>
</Row>

      </Form>
    </Container >
  );
};

export default Signup;