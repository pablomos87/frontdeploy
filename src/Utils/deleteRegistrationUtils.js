import axios from 'axios';

const handleDeleteRegistration = async (userId, courseId) => {
  try {
    const confirmation = window.confirm('¿Estás seguro de que quieres eliminar esta inscripción?');

    if (confirmation) {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.delete(`https://backdeploy-proyectofinal-utn.up.railway.app/courses/inscripcion/${userId}/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });

      if (response.data.message === 'Usuario eliminado correctamente del curso') {
        alert('Inscripción eliminada correctamente.');
        window.location.reload();
      } else {
        console.log('Error al eliminar la inscripción', response.data.message);
      }
    } else {
      console.log('Eliminación cancelada.');
    }
  } catch (error) {
    console.error('Error al eliminar la inscripción:', error);
  }
};

export default handleDeleteRegistration;