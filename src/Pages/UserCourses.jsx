import React from 'react';
import { ListGroup, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useUserProfile from '../Hooks/useUserProfile';
import { useAuth } from '../Context/AuthContext';
import '../Styles/UserCourses.css';

const UserCourses = () => {
  const { username } = useAuth();
  const { user, courseDetails } = useUserProfile(username);

  if (!user.firstName) {
    return null;
  }

  return (
    <Container fluid className="pb-5">
      <Col md={12} className="mt-5 mb-5">
        <h3 className="mb-2 pb-3 fw-bold">
          {user.firstName}, estos son los cursos en los que te inscribiste:
        </h3>
        {courseDetails.map((courseDetail, index) => (
          <Link
            key={index}
            to={`/courses/detail?courseId=${courseDetail.course._id}`}
            style={{ textDecoration: 'none' }}
          >
            <ListGroup key={index} className="mb-5 border-2 bg-light">
              <ListGroup.Item action className="bg-light pt-3 pb-3">
                <div className="d-flex w-100 justify-content-between">
                  <div>
                    <h5 className="fs-5 fw-bold pb-3 pt-3">
                      Curso de {courseDetail.course.nombre}
                    </h5>
                    <p className="fw-medium">{courseDetail.course.certificacion}</p>
                    <p>Duración: {courseDetail.course.duracion}</p>
                    <p className="fs-6 fst-italic">
                      Fecha de inicio: {courseDetail.course.inicio}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center align-items-center ms-1">
                    <img
                      src={courseDetail.course.imagen}
                      alt="Course"
                      className="img-fluid custom-user-courses-image-2"
                      style={{ maxWidth: '150px', maxHeight: '150px' }}
                    />
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Link>
        ))}
      </Col>
    </Container>
  );
};

export default UserCourses;