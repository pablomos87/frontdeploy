import { useState, useEffect } from 'react';
import axios from 'axios';

const useViewsCount = () => {
  const [viewsCount, setViewsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://backdeploy-proyectofinal-utn.up.railway.app/visits/count')
      .then(response => {
        setViewsCount(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el contador de visitas:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { viewsCount, loading, error };
};

export default useViewsCount;