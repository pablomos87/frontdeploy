import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useCourseData from '../Hooks/useCourseData';
import '../Styles/AdminCourses.css';
import { handleDeleteCourse } from '../Utils/editCourseUtils';

const AdminCourses = () => {
  const { courses, loading, error } = useCourseData(window.location);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (courses.length === 0) {
    return null;
  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col className="mx-auto">
          <Table bordered className="text-center mx-auto w-75">
            <tbody className="custom-font-size-course-table align-content-center">
              <tr className="fw-bold">
                <td className="align-middle">Título</td>
                <td className="align-middle">Fecha de Inicio</td>
                <td className="align-middle">Institución</td>
                <td className="align-middle">Edición</td>
              </tr>
              {courses.map((course) => (
                <tr key={course._id} className="align-middle custom-font-size-course-table">
                  <td className="align-middle custom-font-size-course-table">{course.nombre}</td>
                  <td className="align-middle custom-font-size-course-table">{course.inicio}</td>
                  <td className="align-middle custom-font-size-course-table">{course.certificacion}</td>
                  <td className="align-middle custom-font-size-course-table">  
                  <td>
                    <Link to={`/admin/edit-course?courseId=${course._id}`}>
                      <Button variant="light border border-dark custom-font-size-course-table" size="x-sm">Editar</Button>
                    </Link>
                    </td>
                    <td> 
                    <Button variant="light border border-dark custom-font-size-course-table" size="x-sm" onClick={(e) => handleDeleteCourse(e, course._id, navigate)}>Eliminar</Button>
                      </td>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCourses;