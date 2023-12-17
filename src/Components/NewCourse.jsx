import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const NewCourse = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const adminToken = localStorage.getItem('adminToken');
            const response = await axios.post('https://back-proyecto-utn.onrender.com/courses/newcourse', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`
                },
            });
            navigate('/admin')
            console.log('El curso ha sido creado', response.data);

        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container mt-5 text-center">
            <h1>Nuevo curso</h1>
            
                        <Card className="card bg-light mt-5 border-0 mb-5 ms-5 me-5">
                            <Card.Body className="card-body bg-light">
                                <Form onSubmit={handleSubmit} className="p-4">
                                    <Row className="mb-3 pb-3">
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formNombre">
                                                <Form.Label>Nombre:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="text"
                                                    name="nombre"
                                                    value={formData.nombre}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formResumen">
                                                <Form.Label>Palabras clave:</Form.Label>
                                                <Form.Control  className="text-center mb-2"
                                                    type="text"
                                                    name="palabrasClave"
                                                    value={formData.palabrasClave}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 pb-3">
                                        <Col md={12} xs={12}>
                                            <Form.Group as={Col} controlId="formResumen">
                                                <Form.Label>Resumen:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="text"
                                                    name="resumen"
                                                    value={formData.resumen}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 PB-3">
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formInicio">
                                                <Form.Label>Inicio:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="text"
                                                    name="inicio"
                                                    value={formData.inicio}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formRequisitos">
                                                <Form.Label>Requisitos:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="text"
                                                    name="requisitos"
                                                    value={formData.requisitos}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3 pb-3">
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formDuracion">
                                                <Form.Label>Duración:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="text"
                                                    name="duracion"
                                                    value={formData.duracion}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formRegularidad">
                                                <Form.Label>Regularidad:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="text"
                                                    name="regularidad"
                                                    value={formData.regularidad}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 pb-3">
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formCertificacion">
                                                <Form.Label>Certificación:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="text"
                                                    name="certificacion"
                                                    value={formData.certificacion}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formInscriptos">
                                                <Form.Label>Inscriptos:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="number"
                                                    name="inscriptos"
                                                    value={formData.inscriptos}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 pb-3">
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formPrecio">
                                                <Form.Label>Precio:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="number"
                                                    name="precio"
                                                    value={formData.precio}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} xs={12}>
                                            <Form.Group as={Col} controlId="formImagen">
                                                <Form.Label>Imagen:</Form.Label>
                                                <Form.Control className="text-center mb-2"
                                                    type="text"
                                                    name="imagen"
                                                    value={formData.imagen}
                                                    onChange={handleChange}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3 pb-3">
                                    <Col md={12} xs={12} className="mb-3 pb-3">
                                        <Form.Group controlId="formDescripcion">
                                            <Form.Label>Descripción:</Form.Label>
                                            <Form.Control as="textarea" rows={5}
                                                name="descripcion"
                                                value={formData.descripcion}
                                                onChange={handleChange}
                                                required />
                                        </Form.Group>
                                    </Col>
                                    </Row>
                                    <Col md={8} xs={12} className="mb-3 pb-3 d-flex flex-column justify-content-center align-items-center container-fluid">
                                    <Button type="submit" className="btn btn-secondary mt-5">
                                        Crear Curso
                                    </Button>
                                    <Button type="reset" className="btn btn-secondary mt-5">
                                        Reset
                                    </Button>
                                    </Col>
                            </Form>
                    </Card.Body>
                </Card>
            </div>
    );
};

export default NewCourse;