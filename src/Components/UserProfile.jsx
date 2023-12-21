import { Container, Row, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import 'moment/locale/es';
import './CSS/UserProfile.css';
import { useAuth } from '../AuthContext';



const UserProfile = () => {

  const { username } = useAuth();  
  const [user, setUser] = useState({ registeredCourses: [] });
  const [courseDetails, setCourseDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showAll, setShowAll] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(
          `https://backdeploy-proyectofinal-utn.up.railway.app/users/byusername?username=${username}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        );
  
        setUser(response.data.user);
  
        const coursesDetails = await Promise.all(
          response.data.user.registeredCourses.map(async (courseId) => {
            try {
              const courseResponse = await axios.get(`https://backdeploy-proyectofinal-utn.up.railway.app/courses/detail?courseId=${courseId}`);
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
        setFormData(response.data.user);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
  
    fetchData();
  }, [username]);


  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.username ||
    !formData.email ||
    !formData.gender ||
    !formData.birthDate ||
    !formData.city ||
    !formData.country
  ) {
    return null;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(user);
  };


  const handleSave = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      await axios.post('https://backdeploy-proyectofinal-utn.up.railway.app/users/edit', {
        ...formData,
        id: user._id
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
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
        <p className="fs-4 mt-4 mb-5 fw-bold ps-2">Mi perfil</p>
        {user && (
          <Row className="container-fluid justify-content-md-center m-0">
            <Col md={8} className="container-fluid m-0">
              <div className="fs-6">
                  <Row className="mb-3">
                    <Col xs={6} className="text-start">
                      Nombre:
                    </Col>
                    <Col xs={6}>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          onBlur={handleSave}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span onClick={handleEdit}>{formData.firstName}</span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Apellido:</Col>
                    <Col xs={6}>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          onBlur={handleSave}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="align-content-end" onClick={handleEdit}>{formData.lastName}</span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Nombre de usuario:</Col>
                    <Col xs={6}>
                      {isEditing ? (
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          onBlur={handleSave}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span onClick={handleEdit}>{formData.username}</span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={4}>Correo electrónico:</Col>
                    <Col xs={8}>
                      {isEditing ? (
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleSave}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEdit}>{formData.email}</span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Género:</Col>
                    <Col xs={6} >
                      {isEditing ? (
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          onBlur={handleSave}
                          className="border-0 text-end w-100"

                        >
                          <option value="">Elige una opción</option>
                          <option value="masculino">Masculino</option>
                          <option value="femenino">Femenino</option>
                          <option value="otro">Otro</option>
                        </select>
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEdit}>
                      {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}
                  </span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Fecha de nacimiento:</Col>
                    <Col xs={6}>
                      {isEditing ? (
                        <input
                          type="text"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          onBlur={handleSave}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEdit}>{formData.birthDate}</span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6}>Ciudad:</Col>
                    <Col xs={6}>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onBlur={handleSave}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEdit}>{formData.city}</span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col xs={6}>País:</Col>
                    <Col xs={6}>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          onBlur={handleSave}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEdit}>{formData.country}</span>
                        </div>
                      )}
                    </Col>
                  </Row>
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
      <Container fluid>
        <Col xs="12" className="d-flex justify-content-between  align-items-center mb-2  pb-4">
          <p className="mt-3 fw-normal mb-0 fw-bold">Actividad reciente</p>
          <p className="mb-0 mt-3 text-muted link-text" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Mostrar menos' : 'Mostrar más'}
          </p>
        </Col>
        <Row>
          <Col className="mb-2">
            <div className="mb-5 p-2">
              {courseDetails.length > 0 ? (
                courseDetails.slice(0, showAll ? courseDetails.length : 3).map((courseDetail, index) => (
                  <div key={index} className="mt-4 text-center">
                    <p className="fst-italic">Hace {convertToBuenosAiresTime(courseDetail.course.fechaInscripcion)} te inscribiste al curso: {courseDetail.course.nombre} que comienza el {courseDetail.course.inicio} </p>
                  </div>
                ))
              ) : (
                <p className="text-center">No hay actividad reciente para mostrar.</p>
              )}
            </div>

            <div className="mb-5 pb-3">
              <p className="text-center fw-bold pt-3">Puedes explorar otras secciones</p>
              <Col className="optionsContainer text-center mt-">
                <li><Link to="/home" >Home</Link> </li>
                <li>  <Link to="/">Mis Cursos </Link></li>
              </Col>
            </div>

          </Col>

        </Row>

      </Container>
    </Container>
  );
};

export default UserProfile;