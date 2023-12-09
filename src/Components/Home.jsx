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
        const response = await axios.get('https://back-proyecto-utn.onrender.com/courses');
        console.log(response.data); 
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
  <Card.Img className="img-portada" variant="top" src={image} alt="foto-portada"/>
    <div className="text-overlay">
      <h1 className= "fw-bold fs-2">Cursos Online</h1>
      <p className="text-sm fs-4">Elige el curso para vos.</p>
    </div>
  </Col>
</Row>
        <Row className="p-4">
        <Col>
          <h2 className="fw-bold fs-3"> Novedades</h2>
          <p className="fw-bold f-4">Explora los cursos más nuevos.</p>
        </Col>
  
      
      <Row className="card-container mt-2 mb-1 p-3 bg-light border border-tertiary container-sm mx-auto p-4">
        {lastThreeCourses.map((course)  => (
        <Col lg={4} md={4} sm={12} xs={12} key={course._id} className="justify-content-center d-flex mx-auto">
          <Card className="text-center d-flex h-100 custom-card w-100">
          <Link to={`/courses/detail?courseId=${course._id}`} className="text-dark custom-link">
            <Card.Img src={course.imagen}  className="custom-image-1 img-fluid" />
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
              <p className="text-sm fs-6 text-uppercase fw-bolder m-0 p-0 mt-1">{course.nombre}</p>
              <p className="fs-6 card-text mt-0 mt-1">Fecha de inicio: {course.inicio}</p>
              </div>
              <div className="mt-auto"></div>
            </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
        </Row>

    <Row className="p-4"> 
    <Col className="mt-5">
    <h2 className="fw-bold"> Cursos recientes</h2>
    <p className="fw-bold">Explora los cursos que inician pronto</p>
    </Col>
    <Row className="mt-2 pt-5 container-sm mx-auto">
    {remainingCourses.map((course) => (
        <Col className="mb-3" md={4} key={course._id}>
           <Card className="text-center d-flex flex-column h-100">
           <Link to={`/courses/detail?courseId=${course._id}`} className="text-dark custom-link  ">
            <Card.Img src={course.imagen} className="custom-image-2"/>
            <Card.Body className="d-flex flex-column justify-content-center w-auto p-1 m-1" >
              <div>
              <p className="fs-6 fw-bold card-text mt-1 mb-0 pb-0 ">{course.nombre}</p>
              <p className="fs-6 card-text fw-normal mt-1 pt-0">Fecha de inicio: {course.inicio}</p>
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