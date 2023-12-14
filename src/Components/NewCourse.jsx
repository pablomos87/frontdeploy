import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const NewCourse = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        resumen: '',
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
            const response = await axios.post('https://back-proyecto-utn.onrender.com/courses/newcourse', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate ('/admin')
            console.log('El curso ha sido creado', response.data);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container mt-5 text-center">
            <h1>Nuevo curso</h1>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 mb-3">
                        <div className="card bg-light mb-5">
                            <div className="card-body bg-light">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="nombre">
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control
                                            className="text-center mb-2"
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="resumen">
                                        <Form.Label>Resumen:</Form.Label>
                                        <Form.Control
                                            className="text-center mb-2"
                                            type="text"
                                            name="resumen"
                                            value={formData.resumen}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="requisitos">
                                        <Form.Label>Requisitos:</Form.Label>
                                        <Form.Control
                                            className="text-center mb-2"
                                            type="text"
                                            name="requisitos"
                                            value={formData.requisitos}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="precio">
                                        <Form.Label>Precio:</Form.Label>
                                        <Form.Control
                                            className="text-center mb-2"
                                            type="number"
                                            name="precio"
                                            value={formData.precio}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>
                                    <Form.Group controlId="inicio">
                                        <Form.Label>Fecha de inicio:</Form.Label>
                                        <Form.Control className="text-center mb-2"
                                            type="text"
                                            name="inicio"
                                            value={formData.inicio}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>
                                    <Form.Group controlId="duracion">
                                        <Form.Label>Duración:</Form.Label>
                                        <Form.Control className="text-center mb-2"
                                            type="text"
                                            name="duracion"
                                            value={formData.duracion}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>
                                    <Form.Group controlId="regularidad">
                                        <Form.Label>Regularidad:</Form.Label>
                                        <Form.Control className="text-center mb-2"
                                            type="text"
                                            name="regularidad"
                                            value={formData.regularidad}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>
                                    <Form.Group controlId="certificacion">
                                        <Form.Label>Certificación:</Form.Label>
                                        <Form.Control className="text-center mb-2"
                                            type="text"
                                            name="certificacion"
                                            value={formData.certificacion}
                                            onChange={handleChange}
                                            required />

                                    </Form.Group>
                                    <Form.Group controlId="inscriptos">
                                        <Form.Label>Inscriptos:</Form.Label>
                                        <Form.Control className="text-center mb-2"
                                            type="number"
                                            name="inscriptos"
                                            value={formData.inscriptos}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>
                                    <Form.Group controlId="imagen">
                                        <Form.Label>Imagen:</Form.Label>
                                        <Form.Control className="text-center mb-2"
                                            type="text"
                                            name="imagen"
                                            value={formData.imagen}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>
                                    <Form.Group controlId="descripcion">
                                        <Form.Label>Descripción:</Form.Label>
                                        <Form.Control as="textarea"  rows={5}
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>
                                    <Button type="submit"  className="btn btn-secondary mt-5">
                                        Crear Curso
                                    </Button>
                                    </Form>
                                    
                                    <Button type="reset" className="btn btn-secondary mt-5">
                                        Reset
                                    </Button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCourse;