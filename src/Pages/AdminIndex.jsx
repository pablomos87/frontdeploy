import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaUser, FaRegEye, FaBookOpen, FaTools } from 'react-icons/fa';
import useUserData from '../Hooks/useUserData';
import useCount from '../Hooks/useCount';
import '../Styles/AdminIndex.css';
import useCourseData from '../Hooks/useCourseData';
import useRecentRegistrations from '../Hooks/useRecentRegistrations';
import convertToBuenosAiresTime from '../Utils/dateUtils'


const AdminPage = () => {
  const location = useLocation();
  const contadorUsuarios = useCount('users');
  const contadorCursos = useCount('courses');
  const contadorAdmin = useCount('admin');
  const contadorVisitas = useCount('visits');
  const { courses, loading: coursesLoading, error: coursesError } = useCourseData(location);
  const { users, loading: usersLoading, error: usersError } = useUserData();
  const { recentRegistrations, loading: registrationLoading, error: registrationError } = useRecentRegistrations(users);
  const lastThreeCourses = courses.slice(-3);
  const lastThreeUsers = users.slice(-3);
  
  const lastThreeCoursesSorted = lastThreeCourses.sort((a, b) => new Date(b.fechaInclusion) - new Date(a.fechaInclusion));
  const lastThreeUsersSorted = lastThreeUsers.sort((a, b) => new Date(b.fechaInclusion) - new Date(a.fechaInclusion));
  
  const renderCourses = () => {
    if (coursesLoading) return <p>Loading courses...</p>;
    if (coursesError) return <p>Error loading courses: {coursesError.message}</p>;

    return (
      <Card>
        <Card.Header>
          <h4>Updates</h4>
        </Card.Header>
        <ListGroup>
          <ListGroupItem className="custom-admin-font-size-1 fw-bold pb-4">Cursos añadidos</ListGroupItem>
          {lastThreeCoursesSorted.map((course) => (
            <ListGroupItem key={course._id}>
              <div className="d-flex flex-row justify-content-between custom-admin-font-size-2">
                <p className="fw-bold m-0">
                  {course.nombre} ({course.certificacion})
                </p>
                <p className="text-end ms-1">{convertToBuenosAiresTime(course.fechaInclusion)}</p>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    );
  };

  const renderUsers = () => {
    if (usersLoading) return <p>Loading users...</p>;
    if (usersError) return <p>Error loading users: {usersError.message}</p>;

    return (
      <Card>
        <Card.Header>
          <h4>
            <span>
              <i className="fa fa-comments-o custom-admin-font-size-"></i> Usuarios
            </span>
            <span className="plus_green_bt"></span>
          </h4>
        </Card.Header>
        <ListGroup>
          <ListGroupItem className="custom-admin-font-size-1 fw-bold pb-4">Usuarios registrados</ListGroupItem>
          {lastThreeUsersSorted.map((user) => (
            <ListGroupItem key={user._id}>
              <div className="d-flex flex-row justify-content-between custom-admin-font-size-2">
                <p>{user.username}</p>
                <p className="ms-1 text-end ">{convertToBuenosAiresTime(user.fechaInclusion)}</p>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    );
  };

  const renderRegistrations = () => {

    if (registrationLoading) return <p>Loading recent registrations...</p>;
    if (registrationError) return <p>Error loading recent registrations: {registrationError.message}</p>;
    if (recentRegistrations.length === 0) return <p>No recent registrations.</p>;

    return (
      <Card>
        <Card.Header>
          <h4>
            <span>
              <i className="fa fa-comments-o"></i> Inscripciones
            </span>
            <span className="plus_green_bt"></span>
          </h4>
        </Card.Header>
        <ListGroup>
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
        </ListGroup>
      </Card>
    );
  };

  const counter = () => {
    if (!contadorUsuarios || !contadorCursos || !contadorAdmin || !contadorVisitas) 
      return null;

    return (
      <>
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
                  <p className="">{contadorUsuarios.count}</p>
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
                  <p className="">{contadorVisitas}</p>
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
                  <p className="">{contadorCursos.count}</p>
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
                  <p className="">{contadorAdmin.count}</p>
                  <p className="">Administradores</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </>
    );
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
     {counter()}
     </Row>
      <Container className="mt-5 container-sm mb-5">
        <Row>
          <Col md={12} className="mb-5 mx-auto">
            {renderCourses()}
          </Col>

          <Col md={12} className="mb-5">
            {renderUsers()}
          </Col>

          <Col md={12} className="mb-5">
            {renderRegistrations()} {/* Agregado */}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AdminPage;