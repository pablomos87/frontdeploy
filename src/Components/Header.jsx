import { FaSearch, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import React from 'react';
import { Navbar, Nav, Container, Button, Form, Dropdown } from 'react-bootstrap';
import "./CSS/Header.css";
import { Link } from 'react-router-dom';
import logo from './Images/OIG.png'

import "./CSS/Header.css";

const Header = ({ isAuthenticated, adminIsAuthenticated, name, username, logout }) => {


  return (
    <Navbar expand="lg" className="bg-body-tertiary p-4 ">
      <Container fluid>
        <div className="d-flex align-items-center w-100 justify-content-between ">
          <Navbar.Brand as={Link} to="/" className="fs-4"> 
          <img src={logo}  alt="logo" fluid style={{ width:"5.5rem", height:"5.5rem" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggler m-3" />
          <div className="d-flex flex-row">
          {isAuthenticated ? (
              <Dropdown data-bs-theme="light">
                <Dropdown.Toggle id="dropdown-button" variant="transparent" className="border-0 fw-bold text-secondary" >
                  @{username}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: 'auto' }}>
                  <Dropdown.Item as= {Link} to='/user-profile'>
                    Perfil
                  </Dropdown.Item>
                  <Dropdown.Item as= {Link} to='/user-courses'>
                    Cursos
                    </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              adminIsAuthenticated ? (
                <Dropdown data-bs-theme="light">
                  <Dropdown.Toggle id="admin-dropdown-button" variant="transparent" className="border-0 fw-bold text-secondary ">
                    @{name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: 'auto' }}>
                    <Dropdown.Item href="#/action-1" active>
                      Perfil Admin
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Admin Cursos</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Admin Something</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>Cerrar sesión Admin</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signup" className="me-3" title="Sign Up"> <FaUserPlus/> <span className="d-none d-sm-inline">Sign Up</span></Nav.Link>
                  <Nav.Link as={Link} to="/login" className="me-3" title="Login"> <FaSignInAlt/> <span className="d-none d-sm-inline">Login</span></Nav.Link>
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
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2 fs-6"
                aria-label="Search"
              />
              <Button variant="outline-dark">
                <FaSearch />
              </Button>
            </Form>
            <Nav className="hide-on-large bg-light w-50‹">
              <Nav className="flex-column w-50">

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

              <Nav className="flex-column">
                <div className="d-flex">
                  <h4 className="pt-4 text-sm text-start pb-3">Suscripciones</h4>
                </div>
                <Nav.Link className="text-dark text-sm">Todos los cursos</Nav.Link>
                <Nav.Link className="text-dark text-sm">Cursos recientes </Nav.Link>
                <Nav.Link className="text-dark text-sm">Cursos gratuitos</Nav.Link>
                <Nav.Link className="text-dark text-sm">Cursos más buscados</Nav.Link>
              </Nav>
            </Nav>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
