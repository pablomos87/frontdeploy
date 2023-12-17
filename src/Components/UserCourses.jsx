import { ListGroup, Container, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS/UserCourses.css'
import { useAuth } from '../AuthContext';

const UserCourses = () => {
  
  const { username } = useAuth();

  const [user, setUser] = useState({ registeredCourses: [] });
  const [courseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const userResponse = axios.get(
          `https://back-proyecto-utn.onrender.com/users/byusername?username=${username}`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );

        const userCoursesResponse = userResponse.then(async (response) => {
          setUser(response.data.user);

          const coursesDetails = await Promise.all(
            response.data.user.registeredCourses.map(async (courseId) => {
              try {
                const courseResponse = await axios.get(
                  `https://back-proyecto-utn.onrender.com/courses/detail?courseId=${courseId}`
                );
                if (courseResponse.data) {
                  return courseResponse.data;
                } else {
                  console.error(`No se encontraron detalles para el curso con ID ${courseId}`);
                  return { nombre: 'Nombre no disponible' };
                }
              } catch (error) {
                console.error('Error al obtener detalles del curso:', error);
                return { nombre: 'Error al cargar detalles' };
              }
            })
          );

          setCourseDetails(coursesDetails);
        });

        await Promise.all([userCoursesResponse]);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchData();
  }, [username]);

  if (!user || !courseDetails.length) {
    return null;
  }


  return (

    <Container fluid className="pb-5">
<Col md={12} className="mt-5 mb-5">
{user && ( 
<h3 className="mb-2 pb-3 fw-bold">{user.firstName}, estos son los cursos en los que te inscribiste:</h3>
 )}
    </Col>
    
    {user &&
    courseDetails.map((courseDetail, index) => (
      <Link key={index} to={`/courses/detail?courseId=${courseDetail.course._id}`} style={{ textDecoration: 'none' }}> 
      <ListGroup key={index} className="mb-5 border-2 bg-light">
    <ListGroup.Item  action className="bg-light pt-3 pb-3">
        <div className="d-flex w-100 justify-content-between">
          
          <div>
          <h5 className="fs-5 fw-bold pb-3 pt-3 ">Curso de {courseDetail.course.nombre}</h5>
          <p className="fw-medium" >{courseDetail.course.certificacion} </p>
          <p >Duración: {courseDetail.course.duracion} </p>
          <p className="fs-6 fst-italic" >Fecha de inicio: {courseDetail.course.inicio}</p>


          </div>
          <div className="d-flex justify-content-center align-items-center ms-1">
          <img src={courseDetail.course.imagen}  alt="Course"
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

export default UserCourses;