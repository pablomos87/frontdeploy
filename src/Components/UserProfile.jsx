import { Container, Row, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import 'moment/locale/es';


const UserProfile = ({ loggedInUsername }) => {

  const [user, setUser] = useState({ registeredCourses: [] });
  const [courseDetails, setCourseDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://back-proyecto-utn.onrender.com/users/byusername?username=${loggedInUsername}`);
        console.log(response.data);
        setUser(response.data.user);

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
        setFormData(response.data.user);

      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchData();
  }, [loggedInUsername]);


  const handleEdit = () => {
    setIsEditing(true);
    setFormData(user);
  };

  const handleSave = async () => {
    try {
      
      await axios.post('https://back-proyecto-utn.onrender.com/users/edit', {
        ...formData,
        id: user._id
      });
      setIsEditing(false);
      setUser(formData);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const convertToBuenosAiresTime = (dateString) => {
    const date = moment.tz(dateString, 'America/Argentina/Buenos_Aires');
    const timeAgo = date.fromNow();
    return `${timeAgo}`;
  };

  return (

    <Container fluid>
      <Col className="container-fluid w-100 mb-5 mt-5 pb-4">
        <p className="fs-4 ms-4 mt-4 mb-5 fw-bold ps-5">Mi perfil</p>
        {user && (
          <Row className="justify-content-md-center">
            <Col md={6}>
              <div className="fs-6">
                <>
                  <Row className="mb-3">
                    <Col xs={6} className="text-start">
                      Nombre:
                    </Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border-0 text-center w-100"
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Apellido:</Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border-0 text-center w-100"
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Nombre de usuaro:</Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="border-0 text-center w-100"
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Correo electrónico:</Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-0 text-center w-100"
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Género:</Col>
                    <Col xs={6} >
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="border-0 text-center w-100"
                        disabled={!isEditing}
                      >
                        <option value="">Elige una opción</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                      </select>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Fecha de nacimiento:</Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="border-0 text-center w-100"
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Ciudad:</Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border-0 text-center w-100"
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col xs={6}>País:</Col>
                    <Col xs={6}>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="border-0 text-center w-100"
                        disabled={!isEditing}
                      />
                    </Col>
                  </Row>
                </>
                <div className="text-center mt-4">
                  <Button variant="secondary" className="w-50" onClick={isEditing ? handleSave : handleEdit}>
                    {isEditing ? 'Guardar' : 'Editar'}
                  </Button>
                </div>
              </div>
            </Col >
          </Row >
        )}
      </Col >

      <hr />
      <Container fluid className="ps-5 pe-5">
        <div className="d-flex justify-content-between align-items-center mb-2 ps-3 pe-3 pb-4">
          <p className="mt-3 fw-normal mb-0 fw-bold">Actividad reciente</p>
          <p className="mb-0 mt-5">
            <a href="#!" className="text-muted">
              Show all
            </a>
          </p>
        </div>
        <Row>
          <Col className="mb-2">
            <div className="mb-5 pb-5">
              {courseDetails.length > 0 ? (
                courseDetails.map((courseDetail, index) => (
                  <div key={index} className="mt-4 text-center">
                    <p className="fst-italic">Hace {convertToBuenosAiresTime(courseDetail.course.fechaInscripcion)} te inscribiste al curso: {courseDetail.course.nombre} que comienza el {courseDetail.course.inicio} </p>
                  </div>
                ))
              ) : (
                <p>No hay actividad reciente para mostrar.</p>
              )}

            </div>

            <div>
              <p className="text-center fw-bold pt-3">Puedes explorar nuestras secciones más populares</p>
              <Col className="optionsContainer text-center mt-">
                <li><Link to="/home" >Home</Link> </li>
                <li>  <Link to="/peliculas">Peliculas</Link></li>
                <li><Link to="/ranking">Ranking</Link> </li>
              </Col>
            </div>

          </Col>

        </Row>

      </Container>
    </Container>
  );
};

export default UserProfile;