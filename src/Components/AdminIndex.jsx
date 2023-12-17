import { React, useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import { FaUser, FaRegEye, FaBookOpen, FaTools } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment-timezone';
import 'moment/locale/es';
import './CSS/AdminIndex.css'


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
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.get('https://back-proyecto-utn.onrender.com/users', {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
        
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
    /* const adminToken = localStorage.getItem('adminToken'); */
    axios.get('https://back-proyecto-utn.onrender.com/visits/count', /* {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    } */)
    .then(response => {
      setVisits(response.data.visitas);
    })
    .catch(error => {
      console.error('Error al obtener el contador de visitas:', error);
    });
}, []);


  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    axios.get('https://back-proyecto-utn.onrender.com/users/count', {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
      .then(response => {
        setContadorUsuarios(response.data.count);
      })
      .catch(error => {
        console.error('Error al obtener el contador de usuarios:', error);
      });
  }, []);


  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    axios.get('https://back-proyecto-utn.onrender.com/courses/count',
    {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
      .then(response => {
        setContadorCursos(response.data.count);
      })
      .catch(error => {
        console.error('Error al obtener el contador de cursos:', error);
      });
  }, []);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    axios.get('https://back-proyecto-utn.onrender.com/admin/count',
    {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
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
              <div>
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
        <Row>
          <Col md={12} className="mb-5 mx-auto">
            <Card>
              <div>
                <Card.Header className="">

                  <h4> Updates </h4>

                </Card.Header>
                <ListGroup className="">
                  <ListGroupItem className="custom-admin-font-size-1 fw-bold pb-4">Cursos añadidos</ListGroupItem>
                </ListGroup>

                {lastThreeCourses.map((course) => (

                  <ListGroup className="border-1" key={course._id}>
                    <ListGroupItem>
                      <div className="d-flex flex-row justify-content-between custom-admin-font-size-2">
                        <p className="fw-bold m-0"> {course.nombre} ({course.certificacion})</p>
                        <p className="text-end ms-1">{convertToBuenosAiresTime(course.fechaInclusion)}</p>
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
                  <h4>
                    <span><i className="fa fa-comments-o custom-admin-font-size-"></i> Usuarios </span>
                    <span className="plus_green_bt">
                    </span>
                  </h4>
                </Card.Header>
                <ListGroup >
                  <ListGroupItem className="custom-admin-font-size-1 fw-bold pb-4">Usuarios registrados</ListGroupItem>
                </ListGroup>
                {lastThreeUsers.map((users) => (

                  <ListGroup className="border-1" key={users._id}>
                    <ListGroupItem>
                      <div className="d-flex flex-row justify-content-between custom-admin-font-size-2">
                        <p > {users.username}</p>
                        <p className="ms-1 text-end ">{convertToBuenosAiresTime(users.fechaInclusion)}</p>
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
            <h4>
              <span><i className="fa fa-comments-o"></i> Inscripciones </span>
              <span className="plus_green_bt"></span>
            </h4>
          </Card.Header>
          {recentRegistrations.map((registration, index) => (
            <div key={index}>
              <ListGroup>
                <ListGroupItem> Usuario: <span className="fw-bold">{registration.username}</span></ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between custom-admin-font-size-2">
                    <p>{registration.nombre}</p>
                    <p className="text-end ms-1">{convertToBuenosAiresTime(registration.fechaInscripcion)}</p>
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