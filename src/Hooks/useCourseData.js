import { useState, useEffect } from 'react';
import axios from 'axios';

const useCourseData = (location) => {
  const [courses, setCourses] = useState([]);
  const [randomCourses, setRandomCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const urlParams = new URLSearchParams(location.search);
        const id = urlParams.get('courseId');
        setCourseId(id);

        if (id) {
          const response = await axios.get(`https://backdeploy-proyectofinal-utn.up.railway.app/courses/detail?courseId=${id}`);
          setCourse(response.data.course);
          setCourseId(id);
        } else {
          console.error('No se encontró el parámetro ID en la URL');
        }
        const coursesResponse = await axios.get('https://backdeploy-proyectofinal-utn.up.railway.app/courses');
        setCourses(coursesResponse.data.courses);
        
        const randomCoursesResponse = await axios.get('https://backdeploy-proyectofinal-utn.up.railway.app/courses/random');
        setRandomCourses(randomCoursesResponse.data.randomCourses);
        
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de cursos:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, courseId]); // Agregar courseId como dependencia

  return { courses, randomCourses, loading, error, course, courseId };
};

export default useCourseData;