import { useState, useEffect } from 'react';

const useRecentRegistrations = (users) => {
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentRegistrations = async () => {
      try {
        const registrations = users
          .filter((user) => user.registeredCourses.length > 0)
          .flatMap((user) => user.registeredCourses.map((course) => ({ ...course, username: user.username })))
          .sort((a, b) => new Date(b.fechaInscripcion) - new Date(a.fechaInscripcion))
          .slice(0, 4);

        setRecentRegistrations(registrations);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las inscripciones recientes:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRecentRegistrations();

  }, [users]);

  return { recentRegistrations, loading, error };
};

export default useRecentRegistrations;