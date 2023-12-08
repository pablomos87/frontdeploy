import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TermsModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Términos y Condiciones</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">

            <p style={{ textAlign: 'justify' }}>Bienvenido a nuestra plataforma de cursos en línea. A continuación se detallan los términos y condiciones que rigen el uso de nuestros servicios:  </p>

            <p style={{ textAlign: 'justify' }}>Uso del Sitio: Al acceder y utilizar nuestros servicios, aceptas cumplir con estos términos y condiciones, así como con todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestra plataforma.</p>

            <p style={{ textAlign: 'justify' }}>Registro y Cuentas: Al registrarte en nuestra plataforma, te comprometes a proporcionar información precisa y completa. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, y aceptas notificar de inmediato cualquier uso no autorizado de tu cuenta.</p>

            <p style={{ textAlign: 'justify' }}>Pago y Matriculación: Al inscribirte en un curso, aceptas pagar las tarifas correspondientes según lo establecido en nuestra plataforma. Los precios de los cursos están sujetos a cambios en cualquier momento, pero dichos cambios no afectarán las inscripciones confirmadas previamente.</p>

            <p style={{ textAlign: 'justify' }}> Cancelación y Reembolso: Las cancelaciones de cursos deben realizarse siguiendo nuestras políticas de cancelación. Los reembolsos, si corresponde, se otorgan según nuestras condiciones de reembolso, y ciertas tarifas pueden ser no reembolsables.</p>

            <p style={{ textAlign: 'justify' }}>Propiedad Intelectual: Todos los materiales, contenidos y recursos proporcionados en nuestros cursos son propiedad intelectual de la plataforma o de nuestros colaboradores. Estos materiales no pueden ser reproducidos, distribuidos o utilizados sin autorización.</p>

            <p style={{ textAlign: 'justify' }}>Comportamiento del Usuario: Los usuarios deben comportarse de manera respetuosa y ética en nuestra plataforma. No se tolerará el acoso, la difamación, la publicación de contenido inapropiado o cualquier actividad que viole nuestros términos.</p>

            <p style={{ textAlign: 'justify' }}>Modificaciones: Nos reservamos el derecho de modificar, suspender o interrumpir cualquier parte de nuestros servicios en cualquier momento. Además, podemos cambiar estos términos y condiciones en cualquier momento, y dichos cambios entrarán en vigencia al publicarse en el sitio.</p>

            <p style={{ textAlign: 'justify' }}> Limitación de Responsabilidad: No somos responsables de ningún daño directo, indirecto, incidental, especial, consecuente u otros tipos de pérdidas derivadas del uso o la imposibilidad de utilizar nuestros servicios.</p>
            
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TermsModal;