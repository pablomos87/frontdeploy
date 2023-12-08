import { React, useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import { FaUser, FaRegEye, FaBookOpen, FaTools } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment-timezone';
import 'moment/locale/es';


const AdminPage = () => {
  const [contadorUsuarios, setContadorUsuarios] = useState(0);
  const [contadorCursos, setContadorCursos] = useState(0);
  const [contadorAdmin, setContadorAdmin] = useState(0);
  const [visits, setVisits] = useState(0);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://back-proyecto-utn.onrender.com/courses');
        console.log(response.data);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error al obtener la lista de cursos:', error);
      }
    };
    fetchData();
  }, []);

  const lastThreeCourses = courses.slice(-3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://back-proyecto-utn.onrender.com/users');
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error al obtener la lista de cursos:', error);
      }
    };
    fetchData();
  }, []);

  const lastThreeUsers = users.slice(-3);


  useEffect(() => {
    const recentRegistrations = users
      .filter((user) => user.registeredCourses.length > 0)
      .flatMap((user) => user.registeredCourses.map((course) => ({ ...course, username: user.username })))
      .sort((a, b) => new Date(b.fechaInscripcion) - new Date(a.fechaInscripcion))
      .slice(0, 4);

    setRecentRegistrations(recentRegistrations);
  }, [users]);


  useEffect(() => {

    axios.get('https://back-proyecto-utn.onrender.com/counter')
      .then(response => {
        setVisits(response.data.count);
      })
      .catch(error => {
        console.error('Error al obtener el contador de visitas:', error);
      });
  }, []);


  useEffect(() => {

    axios.get('https://back-proyecto-utn.onrender.com/users/count')
      .then(response => {
        setContadorUsuarios(response.data.count);
      })
      .catch(error => {
        console.error('Error al obtener el contador de usuarios:', error);
      });
  }, []);


  useEffect(() => {

    axios.get('https://back-proyecto-utn.onrender.com/courses/count')
      .then(response => {
        setContadorCursos(response.data.count);
      })
      .catch(error => {
        console.error('Error al obtener el contador de cursos:', error);
      });
  }, []);

  useEffect(() => {

    axios.get('https://back-proyecto-utn.onrender.com/admin/count')
      .then(response => {
        setContadorAdmin(response.data.count);
      })
      .catch(error => {
        console.error('Error al obtener el contador de administradores:', error);
      });
  }, []);

  const convertToBuenosAiresTime = (dateString) => {
    const date = moment.tz(dateString, 'America/Argentina/Buenos_Aires');

    const timeAgo = date.fromNow();
    return `${timeAgo}`;
  };


  return (

    <Container className="mt-5">

      <Row className="column_title d-flex align-items-center justify-content-center pb-4">
        <Col md={12}>
          <div className="page_title">
            <h2>MENU</h2>
          </div>
        </Col>
      </Row>

      <Row className="column1">
        <Col md={6} lg={3} className="mt-4">
          <Card className="bg-light">
            <div className="d-flex align-items-center justify-content-center flex-column mt-4">
              <div className="align-items-center">
                <div style={{ fontSize: '3rem' }}>
                  <FaUser className="" />
                </div>
              </div>
              <div>
                <div className="text-center">
                  <p className="">{contadorUsuarios}</p>
                  <p className="">Usuarios registrados</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>



        <Col md={6} lg={3} className="mt-4">
          <Card className="bg-light">
            <div className="d-flex align-items-center justify-content-center flex-column mt-4">
              <div className="align-items-center">
                <div style={{ fontSize: '3rem' }}>
                  <FaRegEye className="" />
                </div>
              </div>
              <div className="">
                <div className="text-center">
                  <p className="">{visits}</p>
                  <p className="">Visitas</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mt-4">
          <Card className="bg-light">

            <div className="d-flex align-items-center justify-content-center flex-column mt-4">
              <div className="align-items-center">
                <div style={{ fontSize: '3rem' }}>
                  <FaBookOpen className="" />
                </div>
              </div>
              <div className="">
                <div className="text-center">
                  <p className="">{contadorCursos}</p>
                  <p className="">Cursos</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mt-4 mb-5">
          <Card className="bg-light">

            <div className="d-flex align-items-center justify-content-center flex-column mt-4">
              <div className="align-items-center">
                <div style={{ fontSize: '3rem' }}>
                  <FaTools className="" />
                </div>
              </div>
              <div className="">
                <div className="text-center">
                  <p className="">{contadorAdmin}</p>
                  <p className="">Administradores</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>


      <Container className="mt-5 container-sm mb-5">
        <Row className="">
          <Col md={12} className="mb-5 mx-auto">
            <Card className="">
              <div className="">
                <Card.Header className="">

                  <h3> Updates </h3>

                </Card.Header>
                <ListGroup className="">
                  <ListGroupItem className="fs-5 fw-bold pb-4">Cursos añadidos</ListGroupItem>
                </ListGroup>

                {lastThreeCourses.map((course) => (

                  <ListGroup className="border-1" key={course._id}>
                    <ListGroupItem>
                      <div className="d-flex flex-row justify-content-between">
                        <p className="fw-bold"> {course.nombre} ({course.certificacion})</p>
                        <p className="">{convertToBuenosAiresTime(course.fechaInclusion)}</p>
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                ))}
              </div>
            </Card>
          </Col>

          <Col md={12} className="mb-5">
            <Card >
              <div >
                <Card.Header>
                  <h3>
                    <span><i className="fa fa-comments-o"></i> Usuarios </span>
                    <span className="plus_green_bt">
                    </span>
                  </h3>
                </Card.Header>
                <ListGroup >
                  <ListGroupItem className="fs-5 fw-bold pb-4">Usuarios registrados</ListGroupItem>
                </ListGroup>
                {lastThreeUsers.map((users) => (

                  <ListGroup className="border-1" key={users._id}>
                    <ListGroupItem>
                      <div className="d-flex flex-row justify-content-between">
                        <p > {users.username}</p>
                        <p className="">{convertToBuenosAiresTime(users.fechaInclusion)}</p>
                      </div>
                    </ListGroupItem>

                  </ListGroup>
                ))}

              </div>

            </Card>
          </Col>

          <Col md={12} className="mb-5">
          <Card>
          <Card.Header>
            <h3>
              <span><i className="fa fa-comments-o"></i> Inscripciones </span>
              <span className="plus_green_bt"></span>
            </h3>
          </Card.Header>
          {recentRegistrations.map((registration, index) => (
            <div key={index}>
              <ListGroup>
                <ListGroupItem className="fs-5">Usuario: <span className="fw-bold">{registration.username}</span></ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between">
                    <p>{registration.nombre}</p>
                    <p>{convertToBuenosAiresTime(registration.fechaInscripcion)}</p>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </div>
          ))}
        </Card>
          </Col>
        </Row>
      </Container>

    </Container>
  );
};

export default AdminPage;