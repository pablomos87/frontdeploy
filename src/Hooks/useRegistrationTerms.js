import { useState, useEffect } from 'react';
import axios from 'axios';

const useCourseData = (location) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://backdeploy-proyectofinal-utn.up.railway.app/courses');
        setCourses(response.data); // Suponiendo que los datos de los cursos se encuentran en el campo data de la respuesta
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCourseData();

    // Limpieza de efecto
    return () => {
      // Aquí puedes realizar alguna limpieza si es necesario, como cancelar la solicitud o eliminar event listeners
    };
  }, [location]); // Dependencia opcional, puedes ajustarla según tus necesidades

  return { courses, loading, error };
};

export default useCourseData;