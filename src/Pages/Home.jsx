import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import "../Styles/Home.css";
import image from "../Images/Image2.jpeg";
import CourseCard from '../Components/CourseCard';
import useCourseData from '../Hooks/useCourseData';

const Home = () => {
  const location = useLocation();
  const { courses, loading, error } = useCourseData(location);

  const renderLoadingError = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!courses || courses.length === 0) {
      return <div>No courses found.</div>;
    }

    return null;
  };

  const renderLastThreeCourses = () => {
    const lastThreeCourses = courses.slice(-3);
    return (
      <Row className="card-container-first-row mt-2 mb-1 p-lg-4 p-md-0 p-sm-4 bg-light border border-tertiary mx-auto w-100">
        {lastThreeCourses.map((course) => (
          <Col lg={4} md={4} sm={12} xs={12} key={course._id} className="justify-content-center d-flex mx-auto">
            <CourseCard className="courseCard-1" course={course} showInicio={true} />
          </Col>
        ))}
      </Row>
    );
  };

  const renderRemainingCourses = () => {
    const remainingCourses = courses.slice(0, -3);
    return (
      <Row className="card-container-second-row mt-2 pt-5 container-sm mx-auto">
        {remainingCourses.map((course) => (
          <Col className="mb-3" md={4} key={course._id}>
            <CourseCard course={course} className="smaller-card" showInicio={true} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div className="justify-content-center align-self-center m-2 pb-5">
      {renderLoadingError()}

      <Row className="home-title-row mt-5 pb-5 mb-5 p-1 mx-auto">
        <Col className="image-container p-0">
          <Image className="img-portada w-100" variant="top" src={image} alt="foto-portada" />
          <div className="text-overlay">
            <h1 className="fw-bold fs-2">Cursos Online</h1>
            <p className="text-sm fs-4">Elige el curso para vos.</p>
          </div>
        </Col>
      </Row>

      <Row className="p-lg-4 ps-md-0 pe-md-0 p-sm-5">
        <Col>
          <h2 className="fw-bold"> Novedades</h2>
          <p className="fw-bold f-4">Explora los cursos más nuevos</p>
        </Col>
        {renderLastThreeCourses()}
      </Row>

      <Row className="p-4 p-md-2">
        <Col className="mt-5">
          <h3 className="fw-bold"> Cursos próximos a iniciar </h3>
          <p className="fw-bold">Explora los cursos que inician pronto</p>
        </Col>
        {renderRemainingCourses()}
      </Row>
    </div>
  );
};

export default Home;