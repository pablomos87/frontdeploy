
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';


const UsersAdmin = () => {
  
  const [users, setUsers] = useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.get('https://back-proyecto-utn.onrender.com/users',
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
        const response = await axios.delete('https://back-proyecto-utn.onrender.com/users/delete', {
          data: { userId }
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );
  
        if (response.data.message === `Usuario con ID ${userId} eliminado exitosamente`) {
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
  
  
  return (

    
<Container className="mx-auto mt-5 mb-5">
      <Row>
        <Col>
          <Table bordered className="mx-auto w-75 text-center">
            <tbody>
              <tr className="fw-bold">
                <td>Nombre</td>
                <td>Apellido</td>
                <td>Usuario</td>
                <td>Email</td>
                <td>Edición</td>
              </tr>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>  <Button onClick={() => handleDeleteUser(user._id)} variant="light border border-dark" >Eliminar usuario </Button></td>
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