import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import "../Styles/Courses.css";
import useCourseData from '../Hooks/useCourseData';
import CourseCard from '../Components/CourseCard';

const Courses = () => {
  const { courses, randomCourses, loading, error } = useCourseData(useLocation());
  const location = useLocation();
  const courseIdFromUrl = new URLSearchParams(location.search).get('courseId');
  const renderCourseDetails = courses.find(course => course._id === courseIdFromUrl);

  const renderLoadingOrError = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return null;
  };

  if (!renderCourseDetails) {
    return renderLoadingOrError();
  }

  const { nombre, resumen, duracion, regularidad, certificacion, inicio, imagen, descripcion, requisitos } = renderCourseDetails;

  return (
    <Container fluid className="pb-5">
      <section className="text-center my-5">
        <h1 className="fw-bold">Curso de {nombre}</h1>
        <p>{resumen}</p>
      </section>

      <section className="container-fluid w-100">
        <Container fluid className="border-2 w-100">
          <Row>
            <Col md={6} sm={5} xs={5} className="container-fluid w-50">
              <p className="mb-3 pb-2 h3 fw-bold text-center text-md-start">Detalles del curso</p>
              <p className="fw-bold text-center text-md-start"> Duración: {duracion}.</p>
              <p className="fw-bold text-center text-md-start"> Regularidad: {regularidad}.</p>
              <p className="fw-bold text-center text-md-start">Certificación: {certificacion}.</p>
              <p className="fw-bold text-center text-md-start"> Inicio del curso: {inicio}.</p>
              <Row className="mt-4 mb-2">
              </Row>
            </Col>

            <Col md={6} sm={7} xs={7} className="container-fluid d-flex justify-content-center align-items-center p-0 mb-2">
              <Image
                src={imagen}
                alt="Course"
                className="custom-course-image-1 justify-items-center align-content-center"
              />
            </Col>
          </Row>
          <Link to={`/courses/registration?courseId=${renderCourseDetails._id}`} className="text-dark custom-link text-center d-flex justify-content-center">
            <Button variant="light border border-dark fw-bolder small" className="w-50 w-sm-100 mt-4">
              Inscripción
            </Button>
          </Link>
        </Container>
      </section>

      <section className="my-5 mb-5">
        <Container>
          <Row>
            <Col md={7} sm={12} xs={12} className="mb-3">
              <p className="mb-3 h3 fw-bold">Sobre el curso</p>
              <p style={{ textAlign: 'justify' }}>
                {descripcion}
              </p>
            </Col>
            <Col md={5} sm={12} xs={12} className="justify-content-center d-flex flex-column align-content-center">
              <Card className="border-2 w-100  text-center pb-4 pe-1 ps-1 pt-3">
                <Card.Body>
                  <Card.Title className="fw-bold">Requisitos para inscribirte al curso </Card.Title>
                  <hr />
                  <Card.Text className="pb-3 fs-6 fw-medium w-100">
                    {requisitos} <FaCheckCircle />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="mb-5 container-fluid w-100 p-0">
        <Container fluid className="container-sm w-100 p-0">
          <h4 className="mb-4 text-sm">Visitá los cursos más populares</h4>
          <Row className="w-100 container-fluid p-0">
            {randomCourses.map((course) => (
              <Col key={course._id} xs={12} sm={12} md={4} lg={4} className="card-container-random-col container-fluid mb-3 W-100 p-1">
                <CourseCard course={course} showInicio={false} smallSize />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Container>
  );
};

export default Courses;