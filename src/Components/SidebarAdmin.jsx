
import React from 'react';
import { Container, Col, Nav, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
    return (
        <Container className="ps-0 pe-2 border-0">
      <Col xs={3} className="sidebar-container">
        <div className="text-end pe-3 mt-5 mb-4 pt-4">
          <h4 className="text-sm">Herramientas</h4>
        </div>

        <Card.Body>
          <Nav className="flex-column">
          <Nav.Link as={Link} to="/admin/" className="text-dark text-sm pb-3">
          Panel de Administración
            </Nav.Link>
          <Nav.Link as={Link} to="/admin/crear-cursos" className="text-dark text-sm pb-3">
              Añadir cursos
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/cursos" className="text-dark text-sm pb-3">
              Editar cursos
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/usuarios" className="text-dark text-sm pb-3">
              Administrar usuarios
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/course-registration" className="text-dark text-sm pb-3">
              Administrar inscripciones
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/administradores" className="text-dark text-sm pb-3">
              Administradores
            </Nav.Link>
          </Nav>
        </Card.Body>
      </Col>
    </Container>
  );
};

export default SidebarAdmin;

