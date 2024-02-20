import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const SignupSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/login'); 
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <Container fluid className="mt-5">    
      <Row className='justify-content-center pt-5'>
        <Col md={6} className='text-center pt-5'>
          <FaCheckCircle style={{ fontSize: '4.5em'}} />
          <h3 className='mt-4'>¡Registro exitoso!</h3>
          <p className='lead'>Muchas gracias por registrarte. Procede a iniciar sesión</p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupSuccess;