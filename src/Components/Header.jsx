import { FaSearch, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Form, Dropdown } from 'react-bootstrap';
import "./CSS/Header.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from './Images/OIG.png';
import { useAuth } from '../AuthContext';
import axios from 'axios';

import "./CSS/Header.css";

const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { setSearchResults, isAuthenticated, adminIsAuthenticated, name, username, handleUserLogout, handleAdminLogout } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://backdeploy-proyectofinal-utn.up.railway.app/courses/search?query=${searchQuery}`);
      setSearchResults(response.data.courses);
      setSearchQuery('');
      navigate(`/courses/search?query=${searchQuery}`);
    } catch (error) {
      console.error('Error al buscar cursos:', error);

    }
  };

  useEffect(() => {
    setExpanded(false); 
  }, [location.pathname]);

  const handleToggle = () => {
    setExpanded(!expanded);
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
            {isAuthenticated ? (
              <Dropdown data-bs-theme="light">
                <Dropdown.Toggle id="dropdown-button" variant="transparent" className="border-0 fw-bold text-secondary" >
                  @{username}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: 'auto' }}>
                  <Dropdown.Item as={Link} to='/user-profile'>
                    Perfil
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to='/user-courses'>
                    Cursos
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleUserLogout}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              adminIsAuthenticated ? (
                <Dropdown data-bs-theme="light">
                  <Dropdown.Toggle id="admin-dropdown-button" variant="transparent" className="border-0 fw-bold text-secondary ">
                    @{name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: 'auto' }}>
                    <Dropdown.Item onClick={handleAdminLogout}>Cerrar sesión</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signup" className="me-3" title="Sign Up"> <FaUserPlus /> <span className="d-none d-sm-inline">Sign Up</span></Nav.Link>
                  <Nav.Link as={Link} to="/login" className="me-3" title="Login"> <FaSignInAlt /> <span className="d-none d-sm-inline">Login</span></Nav.Link>
                </>
              )
            )}
          </div>
        </div>

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto  d-block"
            style={{ maxHeight: '400px' }}
            navbarScroll
          >
            <Form className="d-flex" onSubmit={handleSearch} >
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2 fs-6"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="search"
              />

              <Button variant="secondary" onClick={handleSearch} type='submit'>
                <FaSearch />
              </Button>
            </Form>
            <Nav className="hide-on-large bg-light w-50">
              {adminIsAuthenticated ? (
                <>
                  <Nav className="flex-column w-75 container-fluid">

                    <div className="d-flex">
                      <h4 className=" pt-5 text-start pb-3">Herramientas</h4>
                    </div>
                    <Nav.Link as={Link} to="/admin/" className="text-dark text-sm pb-3 mt-2 pt-4">
                      Panel de Administración
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/add-course" className="text-dark text-sm pb-3">
                      Añadir cursos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/courses" className="text-dark text-sm pb-3">
                      Editar cursos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/users" className="text-dark text-sm pb-3">
                      Administrar usuarios
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/course-registration" className="text-dark text-sm pb-3">
                      Administrar inscripciones
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/administrators" className="text-dark text-sm pb-3">
                      Administradores
                    </Nav.Link>

                  </Nav>
                </>
              ) : (
                <>
                  <Nav className="flex-column w-75 container-fluid">

                    <div className="d-flex">
                      <h4 className=" pt-5 text-start pb-3">Temáticas</h4>
                    </div>
                    <Nav.Link className="text-dark text-sm">Naturaleza y Medio Ambiente</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Política y Sociedad</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Literatura</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Cuidado de la Salud y Medicina</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Derecho</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Ciencia, Ingeniería y Matemáticas</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Artes Creativas y Medios</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Historia</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Tecnologías de la Información</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Ciencias de la Computación</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Enseñanza</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Idioma</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Habilidades de Estudio</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Psicología y Salud Mental</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Negocios y Administración</Nav.Link>

                  </Nav>

                  <Nav className="flex-column w-75 container-fluid">
                    <div className="d-flex">
                      <h4 className="pt-4 text-sm text-start pb-3">Suscripciones</h4>
                    </div>
                    <Nav.Link className="text-dark text-sm">Todos los cursos</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Cursos recientes </Nav.Link>
                    <Nav.Link className="text-dark text-sm">Cursos gratuitos</Nav.Link>
                    <Nav.Link className="text-dark text-sm">Cursos más buscados</Nav.Link>
                  </Nav>
                </>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
