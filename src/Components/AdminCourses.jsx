
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CSS/AdminCourses.css';


const AdminCourses = () => {
  
  const [courses, setCourses] = useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://back-proyecto-utn.onrender.com/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error al obtener la lista de cursos:', error);
      }
    };
    fetchData();
  }, []);
  
  if (courses.length === 0) {
    return null;
  };

  return (
    
<Container className="mx-auto mt-5 mb-5">
      <Row>
        <Col>
          <Table bordered className="mx-auto w-75 text-center">
            <tbody className="custom-font-size-course-table align-content-center">
              <tr className="fw-bold">
                <td className="align-middle">Título</td>
                <td className="align-middle">Fecha de Inicio</td>
                <td className="align-middle">Institución</td>
                <td className="align-middle">Edición</td>
              </tr>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td className="align-middle">{course.nombre}</td>
                  <td className="align-middle">{course.inicio}</td>
                  <td className="align-middle">{course.duracion}</td>
                  <td>  
                  <Link to={`/admin/edit-course?courseId=${course._id}`}>
        <Button variant="light border border-dark custom-font-size-course-table" size="sm">Editar Curso</Button>
      </Link>
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