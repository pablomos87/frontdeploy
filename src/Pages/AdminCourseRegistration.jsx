import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import useUserData from '../Hooks/useUserData';
import '../Styles/AdminCourseRegistration.css';
import handleDeleteRegistration from '../Utils/deleteRegistrationUtils'

const AdminCourseRegistration = () => {
  const { users } = useUserData();


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
                        onClick={() => handleDeleteRegistration (user._id, course._id)}
                        variant="light border border-dark"
                        size="xs"
                        className="custom-font-size-registration-table">
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