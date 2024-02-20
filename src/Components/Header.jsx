import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import SearchForm from '../Components/SearchForm';
import logo from '../Images/OIG.png';
import "../Styles/Header.css";

const Header = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const { isAuthenticated, adminIsAuthenticated, adminName, username, handleUserLogout, handleAdminLogout } = useAuth();

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      return (
        <Dropdown data-bs-theme="light">
          <Dropdown.Toggle id="dropdown-button" variant="transparent" className="border-0 fw-bold text-secondary">
            @{username}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: 'auto' }}>
            <Dropdown.Item as={Link} to='/user-profile'>Perfil</Dropdown.Item>
            <Dropdown.Item as={Link} to='/user-profile/courses'>Cursos</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleUserLogout}>Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else if (adminIsAuthenticated) {
      return (
        <Dropdown data-bs-theme="light">
          <Dropdown.Toggle id="admin-dropdown-button" variant="transparent" className="border-0 fw-bold text-secondary ">
            @ {adminName}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: 'auto' }}>
            <Dropdown.Item onClick={handleAdminLogout}>Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <>
          <Nav.Link as={Link} to="/signup" className="me-3" title="Sign Up"> <FaUserPlus /> <span className="d-none d-sm-inline">Sign Up</span></Nav.Link>
          <Nav.Link as={Link} to="/login" className="me-3" title="Login"> <FaSignInAlt /> <span className="d-none d-sm-inline">Login</span></Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar expand="lg" expanded={expanded} onToggle={handleToggle} className="bg-body-tertiary p-4 container-fluid">
      <Container fluid>
        <div className="d-flex align-items-center w-100 justify-content-between ">
          <Navbar.Brand as={Link} to="/" className="fs-4">
            <img src={logo} alt="logo" fluid style={{ width: "5.5rem", height: "5.5rem" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggler m-3" />
          <div className="d-flex flex-row">
            {renderAuthLinks()}
          </div>
        </div>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto  d-block" style={{ maxHeight: '400px' }} navbarScroll>
            <SearchForm />

            <Nav className="hide-on-large bg-light w-50">
              {adminIsAuthenticated ? (
                <AdminLinks />
              ) : (
                <UserLinks />
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const AdminLinks = () => (
  <Nav className="flex-column w-75 container-fluid">
    <div className="d-flex">
      <h4 className=" pt-5 text-start pb-3">Herramientas</h4>
    </div>
    <Nav.Link as={Link} to="/admin/" className="text-dark text-sm pb-3 mt-2 pt-4">Panel de Administración</Nav.Link>
    <Nav.Link as={Link} to="/admin/add-course" className="text-dark text-sm pb-3">Añadir cursos</Nav.Link>
    <Nav.Link as={Link} to="/admin/courses" className="text-dark text-sm pb-3">Editar cursos</Nav.Link>
    <Nav.Link as={Link} to="/admin/users" className="text-dark text-sm pb-3">Administrar usuarios</Nav.Link>
    <Nav.Link as={Link} to="/admin/course-registration" className="text-dark text-sm pb-3">Administrar inscripciones</Nav.Link>
    <Nav.Link as={Link} to="/admin/administrators" className="text-dark text-sm pb-3">Administradores</Nav.Link>
  </Nav>
);

const UserLinks = () => (
  <>
    <Nav className="flex-column w-75 container-fluid">
      <div className="d-flex">
        <h4 className=" pt-5 text-start pb-3">Temáticas</h4>
      </div>
      <Nav.Link className="text-dark text-sm">Naturaleza y Medio Ambiente</Nav.Link>
      {/* Rest of the links */}
    </Nav>

    <Nav className="flex-column w-75 container-fluid">
      <div className="d-flex">
        <h4 className="pt-4 text-sm text-start pb-3">Suscripciones</h4>
      </div>
      <Nav.Link className="text-dark text-sm">Todos los cursos</Nav.Link>
      {/* Rest of the links */}
    </Nav>
  </>
);

export default Header;