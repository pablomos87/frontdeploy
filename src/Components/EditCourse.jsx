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
    palabrasClave: '',
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
    
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`https://back-proyecto-utn.onrender.com/courses/detail?courseId=${id}`)
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
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.post(
        `https://back-proyecto-utn.onrender.com/courses/edit`,
        { ...course, id },
  {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  }
);
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
    const confirmation = window.confirm(
      '¿Estás seguro de que quieres eliminar este curso?'
    );

    if (confirmation) {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.delete(
        `https://back-proyecto-utn.onrender.com/courses/delete`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          data: {
            courseId: id,
          },
        }
      );

      if (
        response.data.message === `Curso con ID ${id} eliminado exitosamente`
      ) {
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
      <Row className="mb-4">
          <Col md={6} xs={12}>
          <Form.Group as={Col} controlId="formNombre" className="mb-4">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={course.nombre} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          <Col md={6} xs={12}>
          <Form.Group as={Col} controlId="formResumen">
            <Form.Label>Palabras clave</Form.Label>
            <Form.Control type="text" name="palabrasClave" value={course.palabrasClave} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          </Row>

          <Row className="mb-4">
          <Col md={12} xs={12}>
          <Form.Group as={Col} controlId="formResumen" className="mb-4">
            <Form.Label>Resumen</Form.Label>
            <Form.Control type="text" name="resumen" value={course.resumen} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          </Row>
      
        <Row className="mb-4">
        <Col md={6} xs={12}>
        <Form.Group as={Col} controlId="formInicio" className="mb-4">
            <Form.Label>Inicio</Form.Label>
            <Form.Control type="text" name="inicio" value={course.inicio} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          <Col md={6} xs={12}>
          <Form.Group as={Col} controlId="formRequisitos">
            <Form.Label>Requisitos</Form.Label>
            <Form.Control type="text" name="requisitos" value={course.requisitos} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          </Row>
          <Row className="mb-4">
          <Col md={6} xs={12}>
          <Form.Group as={Col} controlId="formDuracion"className="mb-4">
            <Form.Label>Duración</Form.Label>
            <Form.Control type="text" name="duracion" value={course.duracion} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          <Col md={6} xs={12}>
          <Form.Group as={Col} controlId="formRegularidad">
            <Form.Label>Regularidad</Form.Label>
            <Form.Control type="text" name="regularidad" value={course.regularidad} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          </Row>

        <Row className="mb-4">
        <Col md={6} xs={12}>
          <Form.Group as={Col} controlId="formCertificacion" className="mb-4">
            <Form.Label>Certificación</Form.Label>
            <Form.Control type="text" name="certificacion" value={course.certificacion} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          <Col md={6} xs={12}>
          <Form.Group as={Col} controlId="formInscriptos">
            <Form.Label>Inscriptos</Form.Label>
            <Form.Control type="text" name="inscriptos" value={course.inscriptos} onChange={handleInputChange} />
          </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">

        <Col md={6} xs={12}>
           <Form.Group as={Col} controlId="formPrecio" className="mb-4">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="text" name="precio" value={course.precio} onChange={handleInputChange} />
          </Form.Group>
          </Col>
          <Col md={6} xs={12}>
          <Form.Group as={Col} controlId="formImagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="text" name="imagen" value={course.imagen} onChange={handleInputChange} />
          </Form.Group>
          </Col>

        
        </Row>
        <Col md={12} xs={12} className="mb-4">
        <Form.Group className="mb-2 pt-2 pb-5" controlId="formDescripcion" className="mb-4">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea"  rows={6} name="descripcion" className="pt-2 pb-2 h-10" value={course.descripcion} onChange={handleInputChange} />
        </Form.Group>
        </Col>


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