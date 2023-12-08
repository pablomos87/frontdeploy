import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const EditCourse = () => {

  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('courseId');
  
  const [course, setCourse] = useState({
    nombre: '',
    resumen: '',
    precio: '',
    requisitos: '',
    duracion: '',
    regularidad: '',
    certificacion: '',
    inscriptos: '',
    imagen: '',
    descripcion: '',
    inicio: '',
  });

  useEffect(() => {
    console.log('ID capturado de la URL:', id);
    
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/courses/detail?courseId=${id}`);
          setCourse(response.data.course);
        } catch (error) {
          console.error('Error al obtener detalles del curso:', error);
        }
      };

      fetchCourse();
    } else {
      console.error('No se encontró el parámetro ID en la URL');
    }
  }, [id]);
  
  const handleUpdateCourse = async () => {
    console.log('ID capturado de la URL:', id);
    try {
      const response = await axios.post('http://localhost:9000/courses/edit', {
        ...course,
        id,
      });

      if (response.data.message === `Curso con ID ${id} editado exitosamente`) {
        navigate(`/courses/detail?courseId=${id}`); 
      } else {
        console.log('Error al actualizar el curso', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };
  
  const handleDeleteCourse = async () => {
    try {
      const confirmation = window.confirm('¿Estás seguro de que quieres eliminar este curso?');
  
      if (confirmation) {
        const response = await axios.delete('http://localhost:9000/courses/delete', {
          data: { courseId: id }
        });
  
        if (response.data.message === `Curso con ID ${id} eliminado exitosamente`) {
          navigate('../'); 
        } else {
          console.log('Error al eliminar el curso', response.data.message);
        }
      } else {
        console.log('Eliminación cancelada.');
      }
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    }
  };

  return (
   <>
 
 <Container>
      <Row className="mt-5 mb-5 fw-semibold pb-3">
      <h2 className="h3 ">EDITAR CURSO</h2>
      </Row>
      <Form className="mt-4 p-4 bg-light mb-5">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formNombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" name="nombre" value={course.nombre} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formResumen">
            <Form.Label>Resumen:</Form.Label>
            <Form.Control type="text" name="resumen" value={course.resumen} onChange={handleInputChange} />
          </Form.Group>
      
          </Row>
      
        <Row className="mb-3 PB-3">
           <Form.Group as={Col} controlId="formPrecio">
            <Form.Label>Precio:</Form.Label>
            <Form.Control type="text" name="precio" value={course.precio} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formDuracion">
            <Form.Label>Duración:</Form.Label>
            <Form.Control type="text" name="duracion" value={course.duracion} onChange={handleInputChange} />
          </Form.Group>
          </Row>

          <Row className="mb-3">
          <Form.Group as={Col} controlId="formRegularidad">
            <Form.Label>Regularidad:</Form.Label>
            <Form.Control type="text" name="regularidad" value={course.regularidad} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formRegularidad">
            <Form.Label>Requisitos:</Form.Label>
            <Form.Control type="text" name="requisitos" value={course.requisitos} onChange={handleInputChange} />
          </Form.Group>
          </Row>

        <Row className="mb-3 pb-3">
          <Form.Group as={Col} controlId="formCertificacion">
            <Form.Label>Certificación:</Form.Label>
            <Form.Control type="text" name="certificacion" value={course.certificacion} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formInscriptos">
            <Form.Label>Inscriptos:</Form.Label>
            <Form.Control type="text" name="inscriptos" value={course.inscriptos} onChange={handleInputChange} />
          </Form.Group>
        </Row>

        <Row className="mb-3 pb-3">


        <Form.Group as={Col} controlId="formInicio">
            <Form.Label>Inicio:</Form.Label>
            <Form.Control type="text" name="inicio" value={course.inicio} onChange={handleInputChange} />
          </Form.Group>
          
          <Form.Group as={Col} controlId="formImagen">
            <Form.Label>Imagen:</Form.Label>
            <Form.Control type="text" name="imagen" value={course.imagen} onChange={handleInputChange} />
          </Form.Group>

        
        </Row>

        <Form.Group className="mb-2 pt-2 pb-5" controlId="formDescripcion">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control as="textarea"  rows={6} name="descripcion" className="pt-2 pb-2 h-10" value={course.descripcion} onChange={handleInputChange} />
        </Form.Group>


<Col className="mt-2 mb-5 justify-content-center align-items-center d-flex flex-column">
        <Button variant="secondary border border-dark fw-bolder w-50 mb-4" onClick={handleUpdateCourse}>
          Guardar cambios
        </Button>
      
      <Button variant="secondary border border-dark fw-bolder w-50 mb-4" onClick={handleDeleteCourse}>
        Eliminar curso
      </Button>
      </Col>
      </Form>
    </Container>
    </>
  );
};

export default EditCourse;