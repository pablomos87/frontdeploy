import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const CourseCard = ({ course, showInicio,smallSize }) => {
  const cardClass = smallSize ? "small-course-card" : "";
  
  return (
    <Card className={`course-card ${cardClass} text-center d-flex h-100 custom-card w-100`}>
      <Link to={`/courses/detail?courseId=${course._id}`} style={{ textDecoration: 'none' }} className="text-dark custom-link">
        <Card.Img src={course.imagen} style={{ objectFit: 'cover', height: '11.5rem',  filter: 'opacity(75%)' }} />
        <Card.Body className="d-flex flex-column">
          <div>
            <Card.Text className="text-uppercase custom-font-size-image-2 fw-bold card-text mt-1 mb-0 pb-0">
              {course.nombre}
            </Card.Text>
            {showInicio && course.inicio && (
              <p className="custom-font-size-image-1 mt-0 mt-1">Fecha de inicio: {course.inicio}</p>
            )}
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CourseCard;