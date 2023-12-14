import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle } from 'react-icons/fa';
import "./CSS/Courses.css";


const Courses = () => {
  
  const [course, setCourse] = useState({});
  const [randomCourses, setRandomCourses] = useState([]);
  const location = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
    const urlParams = new URLSearchParams(location.search);
    const courseId = urlParams.get('courseId');

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://back-proyecto-utn.onrender.com/courses/detail?courseId=${courseId}`);
        console.log('data:', response.data);
        setCourse(response.data.course);
      } catch (error) {
        console.error('Error al obtener detalles del curso:', error);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [location.search]);

  useEffect(() => {
    const fetchRandomCourses = async () => {
      try {
        const response = await axios.get('https://back-proyecto-utn.onrender.com/courses/random');
        setRandomCourses(response.data.randomCourses);
      } catch (error) {
        console.error('Error al obtener cursos aleatorios:', error);
      }
    };

    fetchRandomCourses();
  }, []);


  return (
    <Container fluid className="pb-5">
  
      <section className="text-center my-5">
        <h1 className="fw-bold">Curso de {course.nombre}</h1>
        <p>{course.resumen}</p>
      </section>

      
      <section className="my-5">
        <Container fluid className="border-2">
          <Row>
            <Col md={6} sm={5} xs={5} className="ps- container-fluid">
              <p className="mb-3 pb-2 h3 fw-bold text-end text-md-start">Detalles del curso</p>
              <p className="fw-bold text-end text-md-start"> Duración: {course.duracion}.</p> 
              <p className="fw-bold text-end text-md-start"> Regularidad: {course.regularidad}.</p>
              <p className="fw-bold text-end text-md-start">Certificación: {course.certificacion}.</p>
              <p className="fw-bold text-end text-md-start"> Inicio del curso: {course.inicio}.</p> 
              <Row className="mt-4 mb-4">
              <Link to={`/courses/registration?courseId=${course._id}`} className="text-dark custom-link ">
                  <Button variant="light border border-dark fw-bolder small" className="w-100 mt-4">
                    Inscripción
                  </Button>
                </Link>
              </Row>
            </Col>
          
            <Col md={6} sm={7} xs={7} className="container-fluid">
              <img
                src={course.imagen}
                alt="Course"
                className="img-fluid custom-course-image-1"
              />
            </Col>
            </Row>
          
        </Container>
      </section>

      
      <section className="my-5 mb-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4">
            <p className="mb-3 h3 fw-bold">Sobre el curso</p>
              <p style={{ textAlign: 'justify' }}>
              {course.descripcion}
              </p>
            </Col>
            <Col md={6} className="mx-autor">
              <Card className="border-2 w-75 me-4 ms-4 text-center">
               <Card.Body>
                  <Card.Title className="fw-bold">Requisitos para inscribirte al curso </Card.Title>
                  <hr/>
                  <Card.Text className="pt-3 pb-3 fs-6 fw-medium">
                    {course.requisitos} <FaCheckCircle/>
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      

      <section className="mb-5 container-fluid">
      <Container fluid className="container-sm">
          <h4 className="mb-4 text-sm">Visitá los cursos más populares</h4>
          <Row className="w-100 container-fluid">
            {randomCourses.map((course) => (
              <Col key={course._id} xs={8} md={4} lg={4} sm={4} className="container-fluid">
                 <Link to={`/courses/detail?courseId=${course._id}`} style={{ textDecoration: 'none' }}>
                <Card className="h-100 ">
                  <Card.Img variant="top" src={course.imagen} className="img-fluid custom-course-image-2" />
                  <Card.Body className="text-center ">
                  <Card.Text className="fw-bold text-sm" style={{ fontSize: '0.95rem', lineHeight: '1.2' }}>{course.nombre}</Card.Text>
                  </Card.Body>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
    </section>
    </Container>
  );
};


export default Courses;