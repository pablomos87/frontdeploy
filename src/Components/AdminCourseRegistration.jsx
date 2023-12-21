
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/AdminCourseRegistration.css'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const AdminCourseRegistration = () => {


  const [users, setUsers] = useState([]);

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
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteRegistration = async (userId, courseId) => {
    try {
      const confirmation = window.confirm('¿Estás seguro de que quieres eliminar esta inscripción?');

      if (confirmation) {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.delete(`https://backdeploy-proyectofinal-utn.up.railway.app/courses/inscripcion/${userId}/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );
        if (response.data.message === 'Usuario eliminado correctamente del curso') {
          alert('Inscripción eliminada correctamente.');
          window.location.reload();
        } else {
          console.log('Error al eliminar la inscripción', response.data.message);
        }
      } else {
        console.log('Eliminación cancelada.');
      }
    } catch (error) {
      console.error('Error al eliminar la inscripción:', error);
    }
  };

  if (users.length === 0) {
    return null; 
  }

  return (


    <Container className="mx-auto mt-5 mb-5">
      <Row>
        <Col>
          <Table bordered className="mx-auto w-75 text-center custom-font-size-registration-table">
            <tbody>
              <tr className="fw-bold custom-font-size-registration-table align-content-center">
                <td className="align-middle">Usuario</td>
                <td className="align-middle">Cursos</td>
                <td className="align-middle">Eliminar Usuario del Curso</td>
              </tr>
              {users.map((user) => (
                user.registeredCourses.map((course, index) => (
                  <tr key={`${user._id}-${course._id}`} className="custom-font-size-registration-table">
                    {index === 0 && (
                      <td className="custom-font-size-registration-table" rowSpan={user.registeredCourses.length}>{user.username}</td>
                    )}
                    
                    <td key={course._id}>
                      <p className="custom-font-size-registration-table">{course.nombre}</p>
                    </td>
                    <td>
                      <Button
                        onClick={() => handleDeleteRegistration(user._id, course._id)}
                        variant="light border border-dark"
                        size="xs" 
                        className="custom-font-size-registration-table"
                      >
                        Eliminar inscripción
                      </Button>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};


export default AdminCourseRegistration;