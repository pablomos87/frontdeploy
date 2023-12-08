import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9000/users/logout', null, { withCredentials: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Button onClick={handleLogout}>Cerrar sesión</Button>
  );
};

export default LogoutButton;