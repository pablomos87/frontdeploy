
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const AdminCourses = () => {
  
  const [courses, setCourses] = useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/courses');
        console.log(response.data); 
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error al obtener la lista de cursos:', error);
      }
    };
    fetchData();
  }, []);
  
  
  return (

    
<Container className="mx-auto mt-5 mb-5">
      <Row>
        <Col>
          <Table bordered className="mx-auto w-75 text-center">
            <tbody>
              <tr className="fw-bold">
                <td>Título</td>
                <td>Fecha de Inicio</td>
                <td>Institución</td>
                <td>Duración</td>
                <td>Edición</td>
              </tr>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.nombre}</td>
                  <td>{course.inicio}</td>
                  <td>{course.certificacion}</td>
                  <td>{course.duracion}</td>
                  <td>  
                  <Link to={`/admin/editcourse?courseId=${course._id}`}>
        <Button variant="light border border-dark" >Editar Curso</Button>
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