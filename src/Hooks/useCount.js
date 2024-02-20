import { useState, useEffect } from 'react';
import axios from 'axios';


const useCount = (entity) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.get(`https://backdeploy-proyectofinal-utn.up.railway.app/${entity}/count`, {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
        setCount(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(`Error al obtener el contador de ${entity}:`, error);
      }
    };

    fetchCount();

    return () => {}; // Cleanup function
  }, [entity]);

  return count;
};

export default useCount;