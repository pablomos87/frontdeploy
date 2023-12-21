
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import './CSS/AdminUsers.css';


const UsersAdmin = () => {
  
  const [users, setUsers] = useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.get('https://backdeploy-proyectofinal-utn.up.railway.app/users',
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );
        console.log(response.data); 
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };
    fetchData();
  }, []);
  
  const handleDeleteUser = async (userId) => {
    try {
      const confirmation = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
  
      if (confirmation) {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.delete(
          `https://backdeploy-proyectofinal-utn.up.railway.app/users/delete`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
            data: { userId },
          }
        );
  
        if (response.data.message === `User con ID ${userId} eliminado exitosamente`) {
          alert('Usuario eliminado correctamente.');
          window.location.reload();
        } else {
          console.log('Error al eliminar el usuario', response.data.message);
        }
      } else {
        console.log('Eliminación cancelada.');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };
  
  if (users.length === 0) {
    return null;
  }

  return (

    
<Container className="mx-auto mt-5 mb-5 w-sm-75">
      <Row>
        <Col>
          <Table bordered className="mx-auto w-75 text-center">
            <tbody>
              <tr className="fw-bold custom-admin-users-font-size">
                <td className="custom-admin-users-font-size">Nombre</td>
                <td className="custom-admin-users-font-size">Apellido</td>
                <td className="custom-admin-users-font-size">Usuario</td>
                <td className="custom-admin-users-font-size">Email</td>
                <td className="custom-admin-users-font-size">Edición</td>
              </tr>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="custom-admin-users-font-size">{user.firstName}</td>
                  <td className="custom-admin-users-font-size">{user.lastName}</td>
                  <td className="custom-admin-users-font-size">{user.username}</td>
                  <td className="custom-admin-users-font-size">{user.email}</td>
                  <td className="custom-admin-users-font-size m-0">  <Button onClick={() => handleDeleteUser(user._id)} variant="light border border-dark custom-admin-users-font-size" >Eliminar usuario </Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};


export default UsersAdmin;