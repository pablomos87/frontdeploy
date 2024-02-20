import React from "react";
import { Form, FormControl, FormGroup, Button, Row, Col } from 'react-bootstrap';

const SignupForm = ({ onSubmit, formData, formFields }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit} className="bg-light p-4 w-100 mx-auto">
            <Row>
                {formFields.slice(0, 4).map((field, index) => (
                    <Col key={index} className="mb-4" md={6}>
                        <FormGroup className="mb-4">
                            <FormControl
                                type={field.type || "text"}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="form-control form-control-sm"
                                style={{ fontSize: '15px', '@media (max-width: 762px)': { fontSize: '12px' }, '@media (max-width: 576px)': { fontSize: '8px' } }}
                                required={field.required}
                            />
                        </FormGroup>
                    </Col>
                ))}
            </Row>
            {formFields.length >= 5 && (
                <Row>
                    <Col className="mb-4" md={{ span: 6, offset: 3 }}>
                        <FormGroup className="mb-4">
                            <FormControl
                                type={formFields[4].type || "text"}
                                id={formFields[4].name}
                                name={formFields[4].name}
                                placeholder={formFields[4].placeholder}
                                value={formData[formFields[4].name]}
                                onChange={(e) => formFields[4].onChange(e.target.value)}
                                className="form-control form-control-sm"
                                style={{ fontSize: '15px', '@media (max-width: 762px)': { fontSize: '12px' }, '@media (max-width: 576px)': { fontSize: '8px' } }}
                                required={formFields[4].required}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            )}
            <Row>
                {formFields.slice(5).map((field, index) => (
                    <Col key={index} className="mb-4" md={6}>
                        <FormGroup className="mb-4">
                            <FormControl
                                type={field.type || "text"}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="form-control form-control-sm"
                                style={{ fontSize: '15px', '@media (max-width: 762px)': { fontSize: '12px' }, '@media (max-width: 576px)': { fontSize: '8px' } }}
                                required={field.required}
                            />
                        </FormGroup>
                    </Col>
                ))}
            </Row>
            <Col lg={4} md={6} sm={10} xs={10} className="d-flex justify-content-center container-sm">
                <Button variant="secondary" className="w-100 h-50" type='submit'>
                    Registrarse
                </Button>
            </Col>
        </Form>
    );
};

export default SignupForm;