import axios from 'axios';

const handleSearch = async (e, searchQuery, setSearchQuery, navigate) => {
  e.preventDefault();
  try {
    if (!searchQuery.trim()) {
      console.error('La consulta de búsqueda está vacía.');
      return;
    }
    const response = await axios.get(`https://backdeploy-proyectofinal-utn.up.railway.app/courses/search?query=${searchQuery}`);
    setSearchQuery('');
    navigate(`/courses/search?query=${searchQuery}`, {
      state: { searchResults: response.data.courses }
    });
  } catch (error) {
    console.error('Error al buscar cursos:', error);
  }
};

export default handleSearch;