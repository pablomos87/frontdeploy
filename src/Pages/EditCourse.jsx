import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleUpdateCourse, handleInputChange } from '../Utils/editCourseUtils';
import { Container, Row } from 'react-bootstrap';
import useCourseData from '../Hooks/useCourseData';
import CoursesForm from '../Components/CourseForm';

const EditCourse = () => {
  const navigate = useNavigate();
  const { course } = useCourseData(useLocation());

  const [updatedCourse, setUpdatedCourse] = useState({
    nombre: '',
    resumen: '',
    palabrasClave: '',
    inicio: '',
    precio: '',
    requisitos: '',
    duracion: '',
    regularidad: '',
    certificacion: '',
    inscriptos: '',
    imagen: '',
    descripcion: '',
  });

  useEffect(() => {
    if (course) {
      const { nombre, resumen, palabrasClave, inicio, precio, requisitos, duracion, regularidad, certificacion, inscriptos, imagen, descripcion } = course;
      const filteredCourse = { nombre, resumen, palabrasClave, inicio, precio, requisitos, duracion, regularidad, certificacion, inscriptos, imagen, descripcion };
      setUpdatedCourse(filteredCourse);
    }
  }, [course]);

  const handleSubmit = (e) => {
    handleUpdateCourse(e, updatedCourse, course.id, setUpdatedCourse, navigate);
  };

  const fieldsToShow = ['nombre', 'resumen', 'palabrasClave', 'precio', 'requisitos', 'duracion', 'regularidad', 'certificacion', 'inscriptos', 'imagen', 'descripcion', 'inicio'];

  return (
    <Container>
      <Row className="mt-5 mb-2 fw-semibold pb-3">
        <h2 className="h3">EDITAR CURSO</h2>
      </Row>
      <CoursesForm
        formData={updatedCourse}
        fieldsToShow={fieldsToShow}
        handleChange={(e) => handleInputChange(e, setUpdatedCourse)}
        handleSubmit={handleSubmit}
        isEditing={true}
      />
    </Container>
  );
};

export default EditCourse;