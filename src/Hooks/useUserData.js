import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.get('https://backdeploy-proyectofinal-utn.up.railway.app/users', {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();

    return () => {}; // Cleanup function
  }, []);

  return { users, loading, error };
};

export default useUserData;