import React from 'react';
import { Nav, Card, Col, Container} from 'react-bootstrap';
import "../Styles/Sidebar.css";
import { useAuth } from '../Context/AuthContext.js';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const {  adminIsAuthenticated  } = useAuth();

  return (
  
<Container className="ps-0 pe-2 border-0">
  
    <Col className="sidebar-container"> 
            
  
            {adminIsAuthenticated ? ( // Verificar si está autenticado como administrador
        <>
          <div className="text-end pe-3 mt-5 mb-4 pt-4">
          <h4 className="text-sm">Herramientas</h4>
        </div>

      <Card.Body>
          <Nav className="flex-column">
            <Col>
            <Nav.Link as={Link} to="/admin/" className="text-dark text-sm pb-3">
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
            </Col>
          </Nav>
        </Card.Body>
</>
      ) : (
        <>
         <div className="text-end pe-3 mt-5 mb-4 pt-4">
              <h4 className=" text-sm">Temáticas</h4>
            </div>

        <Card.Body >
          <Nav>
            <Col  className="text-end">

            <Nav.Link className="text-dark text-sm pb-3">Naturaleza y Medio Ambiente</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Política y Sociedad</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Literatura</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3" >Cuidado de la Salud y Medicina</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Derecho</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Ciencia, Ingeniería y Matemáticas</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Artes Creativas y Medios</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Historia</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Tecnologías de la Información</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Ciencias de la Computación</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Enseñanza</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Idioma</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Habilidades de Estudio</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Psicología y Salud Mental</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Negocios y Administración</Nav.Link>
            </Col>
          </Nav>
        </Card.Body>

    
        <div className="text-end pe-3 mt-5 mb-4">
              <h4 className="text-sm">Suscripciones</h4>
            </div>
        <Card.Body>
          <Nav>
            <Col className="text-end">
            <Nav.Link className="text-dark text-sm pb-3">Todos los cursos</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Cursos recientes</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Cursos gratuitos</Nav.Link>
            <Nav.Link className="text-dark text-sm pb-3">Cursos más buscados</Nav.Link>
            </Col>
          </Nav>
        </Card.Body>
        </>
      )}
      </Col>
    </Container>
  );
};
export default Sidebar;