import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../Styles/CourseForm.css'

const CoursesForm = ({ formData, handleChange, handleSubmit, handleReset, isEditing }) => {
    return (
        <Form onSubmit={handleSubmit} className="p-4 d-flex flex-column justify-content-center align-items-center w-100 mb-4">
            {Object.keys(formData).map((key, index) => (
              <Form.Group key={key} controlId={`form${key}`} className={`w-100 mb-4 ${index === Object.keys(formData).length - 1 ? 'extra-space' : ''}`}>
              <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
              {index === Object.keys(formData).length - 1 ? ( // Condición para el último Form.Control
                  <Form.Control
                      as="textarea"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={`Ingrese ${key}`}
                      required
                  />
              ) : (
                  <Form.Control
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={`Ingrese ${key}`}
                      required
                  />
              )}
          </Form.Group>
            ))}

            <Button type="submit" className="btn btn-secondary me-2 mb-4 mt-4">
                {isEditing ? 'Guardar Cambios' : 'Crear Curso'}
            </Button>
            {!isEditing && (
                <Button type="button" className="btn btn-secondary pt-4 mt-4 mb-4" onClick={handleReset}>
                    Reset
                </Button>
            )}
        </Form>
    );
};

export default CoursesForm;