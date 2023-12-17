
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const AdminAdministrators = () => {
  
  const [admins, setAdmins] = useState ([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.get('https://back-proyecto-utn.onrender.com/admin', {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );
        console.log(response.data); 
        setAdmins(response.data.admins);
      } catch (error) {
        console.error('Error al obtener la lista de adminsitradores:', error);
      }
    };
    fetchData();
  }, []);
  
 const handleDeleteAdmin = async (adminId) => {
   try {
    const confirmation = window.confirm('¿Estás seguro de que quieres eliminar este administrador?');

    if (confirmation) {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.delete(`https://back-proyecto-utn.onrender.com/admin/delete/${adminId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });

      if (response.data.message === `Administrador con ID ${adminId} eliminado exitosamente`) {
        alert('Administrador eliminado correctamente.');
        window.location.reload();
      } else {
        console.log('Error al eliminar el administrador', response.data.message);
      }
    } else {
      console.log('Eliminación cancelada.');
    }
  } catch (error) {
    console.error('Error al eliminar el administrador:', error);
  }
};
  
  return (

    
<Container className="mx-auto mt-5 mb-5">
      <Row>
        <Col>
          <Table bordered className="mx-auto w-50 text-center">
            <tbody>
              <tr className="fw-bold">
                <td className='pb-3'>Nombre del administrador</td>
                <td className='pb-3'>Edición</td>
              </tr>
              {admins.map((admin) => (
                <tr key={admin._id} className='pt-3'>
                  <td className='pt-3'>{admin.name}</td>
                
                  <td className='pt-3'>  <Button onClick={() => handleDeleteAdmin(admin._id)}
  variant="light border border-dark"  >Eliminar administrador </Button></td>
                </tr>
              ))}
              <tr>
              <td colSpan="2" className="fw-bold text-dark pt-3 pb-3">               
    <Link to="/admin/signup" className="text-dark"> Añadir administrador</Link>
  </td>
              
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      

    </Container>
  );
};

export default AdminAdministrators;