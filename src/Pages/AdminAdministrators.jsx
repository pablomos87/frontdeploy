import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAdminData from '../Hooks/useAdminData';
import '../Styles/AdminAdministrators.css';
import { deleteAdmin } from '../Utils/adminUtils';

const AdminAdministrators = () => {
  const { admins } = useAdminData();

  return (
    <Container className="mx-auto mt-5 mb-5">
      <Row>
        <Col>
          <Table bordered className="mx-auto w-50">
            <tbody>
              <tr className="fw-bold text-center align-items-center">
                <td className='pb-3 align-middle'>Nombre del administrador</td>
                <td className='pb-3 align-middle'>Edición</td>
              </tr>
              {admins.map((admin) => (
                <tr key={admin._id} className='pt-3 text-center custom-admin-administrators-font-size'>
                  <td className='pt-3 custom-admin-administrators-font-size'>{admin.adminName}</td>
                  <td className='pt-3'>  
                    <Button onClick={() => deleteAdmin(admin._id)}
                      variant="light border border-dark" size="sm" className="h-50 custom-admin-administrators-font-size">
                      Eliminar administrador
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="fw-bold text-dark pt-3 pb-3 text-center custom-admin-administrators-font-size">
                  <Link to="/admin/signup" className="text-dark custom-admin-administrators-font-size"> Añadir administrador</Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAdministrators;