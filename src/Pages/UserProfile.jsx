import React, { useState} from 'react';
import { Container, Row, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'moment/locale/es';
import '../Styles/UserProfile.css';
import { useAuth } from '../Context/AuthContext';
import useUserProfile from '../Hooks/useUserProfile'; // Importa el hook useUserProfile
import { handleEdit, handleSave, handleChange } from '../Utils/userProfileUtils';
import convertToBuenosAiresTime from '../Utils/dateUtils';


const UserProfile = () => {
  const { username } = useAuth();
  const { user, courseDetails, formData, setFormData } = useUserProfile(username); // Usa el hook useUserProfile
  const [isEditing, setIsEditing] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const handleEditClick = handleEdit(setIsEditing);
  const handleSaveClick = handleSave(formData, user, setFormData, setIsEditing);
  const handleInputChange = handleChange(formData, setFormData);

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
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        onBlur={handleSaveClick}
                        className="border-0 text-end w-100"
                      />
                    ) : (
                      <div className="text-end">
                        <span onClick={handleEditClick}>{formData.firstName}</span>
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
                          onChange={handleInputChange}
                          onBlur={handleSaveClick}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="align-content-end" onClick={handleEditClick}>{formData.lastName}</span>
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
                          onChange={handleInputChange}
                          onBlur={handleSaveClick}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span onClick={handleEditClick}>{formData.username}</span>
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
                          onChange={handleInputChange}
                          onBlur={handleSaveClick}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEditClick}>{formData.email}</span>
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
                          onChange={handleInputChange}
                          onBlur={handleSaveClick}
                          className="border-0 text-end w-100"

                        >
                          <option value="">Elige una opción</option>
                          <option value="masculino">Masculino</option>
                          <option value="femenino">Femenino</option>
                          <option value="otro">Otro</option>
                        </select>
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEditClick}>
                          {formData.gender && formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}
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
                          onChange={handleInputChange}
                          onBlur={handleSaveClick}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEditClick}>{formData.birthDate}</span>
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
                          onChange={handleInputChange}
                          onBlur={handleSaveClick}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEditClick}>{formData.city}</span>
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
                          onChange={handleInputChange}
                          onBlur={handleSaveClick}
                          className="border-0 text-end w-100"
                        />
                      ) : (
                        <div className="text-end">
                          <span className="border-0 text-end w-100" onClick={handleEditClick}>{formData.country}</span>
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
                <li><Link to="/" >Home</Link> </li>
                <li>  <Link to="/user-profile/courses">Mis Cursos </Link></li>
              </Col>
            </div>

          </Col>

        </Row>

      </Container>
    </Container>
  );
};

export default UserProfile;