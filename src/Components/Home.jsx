import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./CSS/Home.css";
import image from "./Images/Image2.jpeg";

const Home = () => {
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backdeploy-proyectofinal-utn.up.railway.app/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error al obtener la lista de cursos:', error);
      }

    };
    fetchData();
  }, []);

  const lastThreeCourses = courses.slice(-3);
  const remainingCourses = courses.slice(0, -3);




  return (

    <div className="justify-content-center align-self-center m-2 pb-5">
      <Row className="home-title-row mt-5 pb-5 mb-5 p-1 mx-auto">
        <Col className="image-container p-0">
          <Card.Img className="img-portada" variant="top" src={image} alt="foto-portada" />
          <div className="text-overlay">
            <h1 className="fw-bold fs-2">Cursos Online</h1>
            <p className="text-sm fs-4">Elige el curso para vos.</p>
          </div>
        </Col>
      </Row>
      <Row className="p-lg-4 ps-md-0 pe-md-0 p-sm-5">
        <Col>
          <h2 className="fw-bold"> Novedades</h2>
          <p className="fw-bold f-4">Explora los cursos más nuevos</p>
        </Col>


        <Row className="card-container mt-2 mb-1 p-lg-4 p-md-0 p-sm-4 bg-light border border-tertiary mx-auto w-100">
          {lastThreeCourses.map((course) => (
            <Col lg={4} md={4} sm={12} xs={12} key={course._id} className="justify-content-center d-flex mx-auto">
              <Card className="text-center d-flex h-100 custom-card w-100">
                <Link to={`/courses/detail?courseId=${course._id}`} style={{ textDecoration: 'none' }} className="text-dark custom-link">
                  <Card.Img src={course.imagen} className="custom-image-1" />
                  <Card.Body className="d-flex flex-column">
                    <div>
                      <Card.Text className="text-uppercase custom-font-size-image-2 fw-bold card-text mt-1 mb-0 pb-0" style={{ textDecoration: 'underline' }}>
                        {course.nombre}
                      </Card.Text>
                      <p className="custom-font-size-image-1 mt-0 mt-1">Fecha de inicio: {course.inicio}</p>
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>

      <Row className="p-4 p-md-2">
        <Col className="mt-5">
          <h3 className="fw-bold"> Cursos próximos a iniciar </h3>
          <p className="fw-bold">Explora los cursos que inician pronto</p>
        </Col>
        <Row className="mt-2 pt-5 container-sm mx-auto">
          {remainingCourses.map((course) => (
            <Col className="mb-3" md={4} key={course._id}>
              <Card className="text-center d-flex flex-column h-100">
                <Link to={`/courses/detail?courseId=${course._id}`} style={{ textDecoration: 'none' }} className="text-dark custom-link">
                  <Card.Img src={course.imagen} className="custom-image-2" />
                  <Card.Body className="d-flex flex-column justify-content-center w-auto p-1 m-1" >
                    <div>
                      <Card.Text className="custom-font-size-image-2 fw-bold mt-1 mb-0 pb-0" style={{ textDecoration: 'underline' }}>
                        {course.nombre}
                      </Card.Text>
                      <p className="custom-font-size-image-2 card-text fw-normal mt-1 pt-0" >Fecha de inicio: {course.inicio}</p>
                    </div>
                  </Card.Body>
                </Link>
              </Card>
              
            </Col>
          ))}
        </Row>
      </Row>
    </div>
  );
};

export default Home;