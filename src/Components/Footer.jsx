import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import "./CSS/Footer.css";

const Footer = () => {
    return (
    <footer className="footerContainer bg-body-tertiary">
      <Container fluid>
        <Row className="d-flex justify-content-between">
          <Col xs={12} md={4} className="text-center mb-4 mb-md-0 container-sm">
            <h5 className="textTitleFooter">Información de contacto</h5>
            <p className="textFooter">Correo: info@cursosonlne.com</p>
            
          </Col>
          
          <Col xs={12} md={4} className="text-center mb-4 mb-md-0 container-sm">
            <h5 className="textTitleFooter">Enlaces útiles</h5>
            <Nav className="flex-column ">
              <Nav.Link href="/nosotros"  className="listFooter text-black text-decoration-underline">Nosotros</Nav.Link>
              <Nav.Link href="/servicios"  className="listFooter text-black text-decoration-underline">Servicios</Nav.Link>
              <Nav.Link href="/contacto"  className="listFooter text-black text-decoration-underline">Contacto</Nav.Link>
              <Nav.Link href="/admin/" className="listFooter text-black text-decoration-underline">Administrador</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4} className="text-center container-sm">
            <h5 className="textTitleFooter">Síguenos en redes sociales</h5>
            <div className="footerFaIcons d-flex justify-content-center">
              <a href="https://www.facebook.com/miproyecto" className="me-3">
                <FaFacebook  color="black" />
              </a>
              <a href="https://www.twitter.com/miproyecto" className="me-3">
                <FaTwitter  color="black" />
              </a>
              <a href="https://www.instagram.com/miproyecto">
                <FaInstagram color="black" />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="mt-4" />
        <p className="textFooter text-center">
          © {new Date().getFullYear()} Cursos Online. Todos los derechos reservados.
        </p>
        
      </Container>
    </footer>
  );
}

export default Footer;