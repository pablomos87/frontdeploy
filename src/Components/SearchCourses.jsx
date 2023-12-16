import { ListGroup, Container, Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/UserCourses.css'
import { useLocation } from 'react-router-dom';

const SearchCourses = () => {

    const location = useLocation();
    const searchResults = location.state?.searchResults || [];
 

  return (

    <Container fluid className="pb-5">
<Col md={12} className="mt-5 mb-5">

<h3 className="mb-2 pb-3 fw-bold"> Estos son los cursos encontrados:</h3>
    </Col>
    {searchResults.map((course, index) => (
      <Link key={index} to={`/courses/detail?courseId=${course._id}`} style={{ textDecoration: 'none' }}>       
      <ListGroup className="mb-5 border-2 bg-light">
    <ListGroup.Item  action className="bg-light pt-3 pb-3">
        <div className="d-flex w-100 justify-content-between">
          <div  >
          <h5 className="fs-5 fw-bold pb-3 pt-3 ">Curso de {course.nombre}</h5>
          <p className="fw-medium" >{course.certificacion} </p>
          <p >Duración: {course.duracion} </p>
          <p className="fs-6 fst-italic" >Fecha de inicio: {course.inicio}</p>

          </div>
          <div className="d-flex justify-content-center align-items-center ">
          <img src={course.imagen}  alt="Course"
                className="img-fluid custom-user-courses-image-2"
                style={{ maxWidth: '150px', maxHeight: '150px' }}  />
          </div>
         
        </div>
      </ListGroup.Item>
        </ListGroup>
         </Link>
    ))}
  
    </Container>
  );
};

export default SearchCourses;