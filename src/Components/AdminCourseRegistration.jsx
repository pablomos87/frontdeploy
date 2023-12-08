
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';


const AdminCourseRegistration = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/users');
        console.log(response.data);
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
        const response = await axios.delete(`http://localhost:9000/courses/inscripcion/${userId}/${courseId}`);

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

  return (


    <Container className="mx-auto mt-5 mb-5">
      <Row>
        <Col>
          <Table bordered className="mx-auto w-75 text-center">
            <tbody>
              <tr className="fw-bold">
                <td>Usuario</td>
                <td>Cursos</td>
                <td>Eliminar Usuario del Curso</td>
              </tr>
              {users.map((user) => (
                user.registeredCourses.map((course, index) => (
                  <tr key={`${user._id}-${course._id}`}>
                    {index === 0 && (
                      <td rowSpan={user.registeredCourses.length}>{user.username}</td>
                    )}
                    <td key={course._id}>
                      <p>{course.nombre}</p>
                    </td>
                    <td>
                      <Button
                        onClick={() => handleDeleteRegistration(user._id, course._id)}
                        variant="light border border-dark"
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