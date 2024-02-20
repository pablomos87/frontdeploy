import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import SignupForm from "../Components/SignupForm";
import handleAdminSignup from "../Utils/adminSigupUtils";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: "",
    password: "",
    confirmPassword: ""
  });

  const formFields = [
    {
      name: "adminName",
      placeholder: "Ingresa el nombre del administrador",
      required: true,
      onChange: (value) => setFormData({ ...formData, adminName: value })
    },
    {
      name: "password",
      type: "password",
      placeholder: "Ingresa tu contraseña",
      required: true,
      onChange: (value) => setFormData({ ...formData, password: value })
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirma tu contraseña",
      required: true,
      onChange: (value) => setFormData({ ...formData, confirmPassword: value })
    }
  ];

  const handleSubmit = async (formData) => {
    const success = await handleAdminSignup(formData.adminName, formData.password, formData.confirmPassword);
    if (success) {
      navigate(`/admin`);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center m-1">
    <div className="d-flex flex-column justify-content-center align-items-left container-fluid w-100 pb-2 pt-2">
      <h3 className="display-6 fw-bold pt-5">SIGNUP Admin</h3>
    </div>
    <SignupForm onSubmit={handleSubmit} formData={formData} formFields={formFields} isAdmin={true}/>
  </Container>
);
};

export default AdminSignup;