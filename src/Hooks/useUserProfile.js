import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProfile = (username) => {
  const [user, setUser] = useState({ registeredCourses: [] });
  const [courseDetails, setCourseDetails] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) {
          return; // No hacer la solicitud si username no está definido
        }
        
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(
          `https://backdeploy-proyectofinal-utn.up.railway.app/users/byusername?username=${username}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        );

        setUser(response.data.user);
        

        const coursesDetails = await Promise.all(
          response.data.user.registeredCourses.map(async (courseId) => {
            try {
              const courseResponse = await axios.get(`https://backdeploy-proyectofinal-utn.up.railway.app/courses/detail?courseId=${courseId}`);
              if (courseResponse.data) {
                return courseResponse.data;
              } else {
                console.error(`No se encontraron detalles para el curso con ID ${courseId}`);
                return { nombre: 'Nombre no disponible' };
              }
            } catch (error) {
              return { nombre: 'Error al cargar detalles' };
            }
          })
        );

        setCourseDetails(coursesDetails);
        setFormData(response.data.user);
      } catch (error) {
        
      }
    };

    fetchData();
  }, [username, ]);

  return { user, courseDetails, formData, setFormData };
};

export default useUserProfile;