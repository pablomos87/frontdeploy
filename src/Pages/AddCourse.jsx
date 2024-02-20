import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CourseForm from '../Components/CourseForm';
import { handleAddCourse, handleChange, handleReset } from '../Utils/addCourseUtils';
import { useNavigate } from 'react-router-dom';

const NewCourse = () => {
    const navigate = useNavigate();
    const initialFormData = {
        nombre: '',
        resumen: '',
        palabrasClave: '',
        inicio: '',
        requisitos: '',
        precio: 0,
        duracion: '',
        regularidad: '',
        certificacion: '',
        inscriptos: 0,
        imagen: '',
        descripcion: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    return (
        <Container>
            <div className="d-flex flex-column justify-content-center align-items-left container-fluid w-100">
                <h4 className="display-6 fw-bold pt-5">AÑADIR CURSO</h4>
            </div>
            <div className="container-fluid mt-5 text-start">
                <CourseForm
                    formData={formData}
                    handleChange={(e) => handleChange(e, setFormData, formData)}
                    handleSubmit={(e) => handleAddCourse(e, formData, navigate)}
                    handleReset={(e) => handleReset(setFormData, initialFormData)}
                    isEditing={false}
                />
            </div>
        </Container>
    );
};

export default NewCourse;