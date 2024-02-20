import axios from 'axios';

const deleteAdmin = async (adminId) => {
  try {
    const confirmation = window.confirm(
      '¿Estás seguro de que quieres eliminar este administrador?'
    );

    if (confirmation) {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.delete(
        `https://backdeploy-proyectofinal-utn.up.railway.app/admin/delete/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (
        response.data.message === `Administrador con ID ${adminId} eliminado exitosamente`
      ) {  alert('Administrador eliminado exitosamente')
      window.location.reload(); 
        return true;
      } else {
        console.log(
          'Error al eliminar el administrador',
          response.data.message
        );
        return false;
      }
    } else {
      console.log('Eliminación cancelada.');
      return false;
    }
  } catch (error) {
    console.error('Error al eliminar el administrador:', error);
    return false;
  }
};

export { deleteAdmin };