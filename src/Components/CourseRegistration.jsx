import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, ListGroup, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import TermsModal from './TermsModal';
import { useNavigate } from 'react-router-dom';

const CourseRegistration = ({ userId, isAuthenticated }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('courseId');
  const [course, setCourse] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const navigate = useNavigate();
  const handleTermsClose = () => setShowTermsModal(false);
  const handleTermsShow = () => setShowTermsModal(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isRegistrationDisabled, setIsRegistrationDisabled] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/courses/detail?courseId=${courseId}`);
        console.log('data:', response.data);
        setCourse(response.data.course);
      } catch (error) {
        console.error('Error al obtener detalles del curso:', error);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  useEffect(() => {

    if (acceptedTerms && document.querySelector('input[name="metodoPago"]:checked')) {
      setIsRegistrationDisabled(false);
    } else {
      setIsRegistrationDisabled(true);
    }
  }, [acceptedTerms]);

  const handleLoginRedirect = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  };

  const handleRegisterRedirect = () => {
    if (!isAuthenticated) {
      navigate('/signup', { state: { from: location } });
    }
  };


  const handleCourseRegistration = async () => {

    console.log('ID de usuario recibido:', userId);
    console.log('ID de curso recibido:', courseId);

    if (!isAuthenticated) {
      console.log('El usuario no ha iniciado sesión. Redirigiendo...');
      return;
    }

    if (!userId) {
      console.error('userId está indefinido');
      return;
    }

    if (!courseId) {
      console.error('courseId está indefinido');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:9000/courses/inscripcion/${userId}/${courseId}`);
      console.log(response.data.message);
      


      if (response.status === 200) {
        alert ('Incripción exitosa')
        navigate(`/courses/registration/confirmation`, {
          state: {
            userId,
            courseId,
            acceptedTerms,
            selectedPaymentMethod: document.querySelector('input[name="metodoPago"]:checked').id,
            selectedCourseName: course.nombre,
            selectedCoursePrice: course.precio,

          },
        });
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('Ya estás inscrito en este curso');
        } else {
          console.error('Error al inscribirse en el curso:', error);
          console.error('Detalles específicos del error:', error.response.data);
        }
      }
    };




  return (

    <Container
      className="mt-5 pb-4 mb-5 pt-2">
      {course ? (

        <ListGroup className="mt-5 pt-3 w-75 mx-auto">
          <ListGroup.Item className="ps-5 pe-5 pt-3 bg-light">
            <Container className="pt-3 pb-3 text-center">

              <h2 className="fw-bold mb-3">Curso de {course.nombre}</h2>
              <p className="fs-6">{course.resumen}</p>

            </Container>
          </ListGroup.Item>
          <ListGroup.Item className="bg-light ps-5 pe-5 bg-light">
            <h3 className="mb-2 pb-3 fw-bold">Datos de Inscripción</h3>

            <p className="fs-6">Inicio del curso: {course.inicio}.</p>
            <p className="fs-6">Cantidad de participantes: {course.inscriptos} inscriptos.</p>
            <p className="fs-6">Requisitos del curso: {course.requisitos}.</p>
            <p className="fs-6">Precio del curso: $ {course.precio}.</p>
          </ListGroup.Item>
            
              {isAuthenticated ? (
                <>
                <ListGroup.Item className="ps-5 pe-5 bg-light ">
            <Container className="pt-3 pb-3">
                  <Col className="mt-2">

                    <h3 className="mb-4 pb-3 fw-bold">Modalidad de cursada</h3>

                  </Col>
                    <Col>

                      <h5 className="mb-4 fw-medium" > ¿Cómo es la modalidad de cursada en este curso virtual?</h5>

                      <p style={{ textAlign: 'justify' }} className="fs-6 fw-medium">En los cursos que ofrecemos, la modalidad de cursada es completamente virtual, lo que te permite acceder al contenido desde cualquier lugar y a tu propio ritmo. Las clases están grabadas y disponibles en distintas plataformas educativas, lo que te brinda la flexibilidad de aprender según tu disponibilidad.</p>

                      <h5 className="mt-4 mb-4 fw-medium">¿Cómo se realizan las tutorías y resolución de dudas?</h5>

                      <p style={{ textAlign: 'justify' }} className="fs-6 fw-medium">Programamos sesiones de tutoría virtual a través de Zoom con los distintos docentes. Estas sesiones están diseñadas para resolver tus dudas, llevar a cabo tareas prácticas y asegurar que estés siguiendo adecuadamente el proceso de aprendizaje.</p>


                      <h5 className="mt-4 mb-4 fw-medium">¿Dónde encontraré los materiales del curso y la información relevante?</h5>

                      <p  style={{ textAlign: 'justify' }} className="fs-6 fw-medium">Una vez inscrito, recibirás un correo electrónico con los pasos y claves de acceso a la plataforma de educación virtual. En este espacio, encontrarás todos los materiales del curso, información detallada sobre el contenido, así como el cronograma con fechas de evaluaciones y tutorías.</p>

                      <h5 className="mb-4 mt-4 fw-medium">¿Cómo se llevan a cabo las actividades y evaluaciones?</h5>

                      <p style={{ textAlign: 'justify' }} className="fs-6 fw-medium">La dinámica de actividades y evaluaciones es asincrónica, lo que significa que podrás completarlas según tu propio horario. Tendrás acceso a las tareas a realizar y podrás entregarlas dentro de los plazos establecidos en la plataforma. Esto te ofrece la libertad de organizar tu tiempo y progresar de acuerdo a tu disponibilidad.</p>

                      <h5 className="mb-4 mt-4 fw-medium">¿Qué beneficios ofrece esta modalidad de aprendizaje?</h5>

                      <p style={{ textAlign: 'justify' }} className="fs-6 fw-medium">Esta modalidad te brinda la libertad de estructurar tu aprendizaje de acuerdo a tus tiempos y necesidades. Tendrás acceso a recursos variados y podrás interactuar con el contenido de manera flexible, apoyado/a por tutorías virtuales que enriquecerán tu experiencia educativa.</p>

                    </Col>
                  </Container>
                </ListGroup.Item>
              <ListGroup.Item className="ps-5 pe-5 bg-light">
                <Container className="pt-3 pb-3">
                  <h3 className="mb-3 pb-3 fw-bold">Selecciona tu método de pago</h3>

                  <div>
                    <Form.Check
                      type="radio"
                      id="tarjetaCredito"
                      name="metodoPago"
                      label="Tarjeta de crédito"
                      style={{ fontSize: 'medium' }}
                    />
                    <Form.Check
                      type="radio"
                      id="paypal"
                      name="metodoPago"
                      label="PayPal"
                      style={{ fontSize: 'medium' }}
                    />
                    <Form.Check
                      type="radio"
                      id="transferencia"
                      name="metodoPago"
                      label="Transferencia bancaria"
                      style={{ fontSize: 'medium' }}
                    />
                  </div>

                </Container>
              </ListGroup.Item>
              <ListGroup.Item className="ps-5 pe-5 bg-light">
                <Container className="pt-3 pb-3">
                  <Form.Check
                    type="checkbox"
                    classNam="align-items-center mx-auto"
                    style={{ fontSize: 'medium' }}
                    label={
                      <>
                        Acepto los{' '}
                        <span
                          style={{ textDecoration: 'underline', cursor: 'pointer' }}
                          onClick={handleTermsShow}
                        >
                          términos y condiciones
                        </span>
                      </>
                    }
                    checked={acceptedTerms}
                    onChange={() => setAcceptedTerms(!acceptedTerms)}
                  />
                  <TermsModal show={showTermsModal} handleClose={handleTermsClose} />

                  <Col className="mt-5 text-center pb-5" >
                    <Button className="text-center w-50 fs-6" variant="secondary" onClick={handleCourseRegistration} disabled={isRegistrationDisabled}>Inscribirse al curso
                    </Button>
                  </Col>
            </Container>
          </ListGroup.Item>
          
                </>
                ) : (
                <>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-center flex-column align-items-center">

                    <Button variant="transparent" onClick={handleLoginRedirect} className="text-primary text-center">
                      Si ya sos usuario, inicia sesión para inscribirte en este curso
                    </Button>
                    <Button variant="transparent" onClick={handleRegisterRedirect} className="text-primary mx-auto-text-cnter">
                      Si no estás registrado, registrate aquí
                    </Button>
                  </div>
                </>
              )}
      </ListGroup> 

      ) : (
        <p>Cargando curso...</p>
    )}
    
    </Container>
  )
}

export default CourseRegistration;