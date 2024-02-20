import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import SignupForm from "../Components/SignupForm";
import handleUserSignup from "../Utils/userSignupUtils";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    gender: "",
    country: "",
    city: "",
    birthDate: ""
  });

  const formFields = [
    {
      name: "firstName",
      placeholder: "Ingresa tu nombre",
      onChange: (value) => setFormData({ ...formData, firstName: value }),
      required: true
    },
    {
      name: "lastName",
      placeholder: "Ingresa tu apellido",
      onChange: (value) => setFormData({ ...formData, lastName: value }),
      required: true
    },
    {
      name: "username",
      placeholder: "Ingresa tu nombre de usuario",
      onChange: (value) => setFormData({ ...formData, username: value }),
      required: true
    },
    {
      name: "gender",
      placeholder: "Elige el género",
      onChange: (value) => setFormData({ ...formData, gender: value }),
      required: true
    },
    {
      name: "country",
      placeholder: "Ingresa tu país",
      onChange: (value) => setFormData({ ...formData, country: value }),
      required: true
    },
    {
      name: "city",
      placeholder: "Ingresa tu ciudad",
      onChange: (value) => setFormData({ ...formData, city: value }),
      required: true
    },
    {
      name: "birthDate",
      placeholder: "Ingresa tu fecha de nacimiento",
      onChange: (value) => setFormData({ ...formData, birthDate: value }),
      required: true,
      type: "date"
    },
    {
      name: "email",
      placeholder: "Ingresa tu email",
      onChange: (value) => setFormData({ ...formData, email: value }),
      required: true,
      type: "email"
    },
    {
      name: "confirmEmail",
      placeholder: "Confirma tu email",
      onChange: (value) => setFormData({ ...formData, confirmEmail: value }),
      required: true,
      type: "email"
    },
    {
      name: "password",
      placeholder: "Ingresa tu contraseña",
      onChange: (value) => setFormData({ ...formData, password: value }),
      required: true,
      type: "password"
    },
    {
      name: "confirmPassword",
      placeholder: "Confirma tu contraseña",
      onChange: (value) => setFormData({ ...formData, confirmPassword: value }),
      required: true,
      type: "password"
    },
  ];

  const handleSubmit = async () => {
    await handleUserSignup(formData, navigate);
  };

  return (
    <Container className="d-flex flex-column justify-content-center ms-1 me-1 mt-4 mb-4 pb-3">
      <div className="d-flex flex-column justify-content-center align-items-left container-fluid w-100 pb-2 pt-2">
        <h3 className="display-6 fw-bold pb-0">SIGN UP</h3>
        <p className="fw-normal"> Crea una cuenta y se parte de nuestra comunidad</p>
      </div>

      <SignupForm onSubmit={handleSubmit} formData={formData} formFields={formFields} />
    </Container >
  );
};

export default Signup;