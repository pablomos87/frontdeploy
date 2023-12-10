import { ListGroup, Container, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserCourses = ({ loggedInUsername, isAuthenticated }) => {


  const [user, setUser] = useState({ registeredCourses: [] });
  const [courseDetails, setCourseDetails] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://back-proyecto-utn.onrender.com/users/byusername?username=${loggedInUsername}`);
        console.log(response.data);
        setUser(response.data.user);

        console.log('IDs de los cursos:', response.data.user.registeredCourses);

        const coursesDetails = await Promise.all(response.data.user.registeredCourses.map(async courseId => {
          try {
            const courseResponse = await axios.get(`https://back-proyecto-utn.onrender.com/courses/detail?courseId=${courseId}`);
            if (courseResponse.data) {
              return courseResponse.data;
            } else {
              console.error(`No se encontraron detalles para el curso con ID ${courseId}`);
              return { nombre: 'Nombre no disponible', };
            }
          } catch (error) {
            console.error('Error al obtener detalles del curso:', error);
            return { nombre: 'Error al cargar detalles', };
          }
        }));

        setCourseDetails(coursesDetails);

        console.log("Detalles de los cursos:", coursesDetails);

      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchData();
  }, [loggedInUsername]);




  return (

    <Container fluid>
      <Col md={12} className="mt-5 mb-5">
        {user && (
          <h3 className="mb-2 pb-3 fw-bold">{user.firstName}, estos son los cursos en los que te inscribiste:</h3>
        )}
      </Col>

      {user &&
        courseDetails.map((courseDetail, index) => (
          <Link key={index} to={`/courses/detail?courseId=${courseDetail.course._id}`}>
            <ListGroup key={index} className="mb-5 border-2 bg-light">
              <ListGroup.Item action className="bg-light pt-3 pb-3">
                <div className="d-flex w-100 justify-content-between">

                  <div>
                    <h5 className="fs-5 fw-bold pb-3 pt-3">Curso de {courseDetail.course.nombre}</h5>
                    <p className="fw-medium">{courseDetail.course.certificacion} </p>
                    <p>Duración: {courseDetail.course.duracion} </p>
                    <p className="fs-6 fst-italic">Fecha de inicio: {courseDetail.course.inicio}</p>


                  </div>
                  <img src={courseDetail.course.imagen} alt="Course"
                    className="img-fluid w-100 h-auto mt-4"
                    style={{ maxWidth: '150px', maxHeight: '150px' }} />
                </div>
                <small> </small>

                <p className="mb-1">{/* Contenido del curso: courseDetail.contenido */}</p>
                <small>{/* Otros detalles del curso: courseDetail.otroDetalle */}</small>
              </ListGroup.Item>
            </ListGroup>
          </Link>
        ))}

    </Container>
  );
};

export default UserCourses;