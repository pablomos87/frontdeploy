import { ListGroup, Container, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const ConfirmCourseRegistration = () => {

  const { isAuthenticated, username } = useAuth();
  const location = useLocation();
  const { selectedPaymentMethod, selectedCourseName, selectedCoursePrice, registrationId } = location.state || {};


  if (!isAuthenticated) {
    return null;
  }


  return (
    <ListGroup className="mt-5 pt-3 w-75 mx-auto mb-5">
      <ListGroup.Item className="ms-4 me-4 bg-light">
        <Container className="pt-3 pb-3">
          <div className="d-flex w-100 flex-column">
            <h4 className="pb-3 pt-3 fw-bold">¡Gracias {username}! </h4>
            <p className="mb-2 fs-6">Recibirás un correo con los datos para completar el pago (...)</p>
            <div className="d-flex justify-content-between">
              <p className="mb-2 fs-6 fw-bold">Monto a abonar</p>
              <small>${selectedCoursePrice}</small>
            </div>
            <p className="pb-2 mb-2 fs-6">Una vez hecho el pago, estarás recibiendo un email con el acceso al curso</p>
          </div>
          </Container>
      </ListGroup.Item>
      <ListGroup.Item className=" ms-4 me-4">
      <Container className="pt-3 pb-3"> 
        <div className="d-flex w-100 justify-content-between pt-2">
          <p className="mb-2 ms-1 fs-5 fw-bold">Curso</p>
          <p className="fs-5 fw-bold">Precio</p>
        </div>
        <div className="d-flex w-100 justify-content-between pb-4">
          <p className="mb-1">Curso de {selectedCourseName}</p>
          <small className="text-muted">${selectedCoursePrice}</small>
        </div>
        </Container>
      </ListGroup.Item>
      <ListGroup.Item className="ms-4 me-4 bg-light">
        <Container className="pt-3 pb-3">
          <div className="d-flex w-100 flex-column">
            <h4 className="pb-3 pt-3 fw-bold">Resumen de tu inscripción</h4>
            <p className="mb-2 fs-6">Nº  {registrationId && registrationId.substring(0, 15)} </p>
            <p className="mb-2 fs-6 fw-bold">Medio de pago: {selectedPaymentMethod}</p>
            <p className="mb-2 fs-6 fw-bold">Estado del pago: en proceso.</p>
          </div>
        </Container>
        <div className="d-flex justify-content-center align-content-center">
            <Button variant="secondary" as={Link} to="/">Volver</Button>
          </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ConfirmCourseRegistration;