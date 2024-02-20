import axios from 'axios';


export const handleUpdateCourse = async (e, course, courseId, setCourse, navigate) => {
    e.preventDefault(); 
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.post(
        `https://backdeploy-proyectofinal-utn.up.railway.app/courses/edit`,
        { ...course, courseId },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
  
      if (response.data.message === `Curso con ID ${courseId} editado exitosamente`) {
        // Actualiza el estado del curso con los datos del curso actualizado
        setCourse(response.data.course);
        alert('Curso editado exitosamente');
        navigate(`/courses/detail?courseId=${courseId}`);
      } else {
        console.log('Error al actualizar el curso', response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
    }
  };


  export  const handleInputChange = (e, setCourse) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  export const handleDeleteCourse = async (e, id, navigate) => {
    e.preventDefault(); 
  try {
    const confirmation = window.confirm(
      '¿Estás seguro de que quieres eliminar este curso?'
    );

    if (confirmation) {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.delete(
        `https://backdeploy-proyectofinal-utn.up.railway.app/courses/delete`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          data: {
            courseId: id,
          },
        }
      );

      if (
        response.data.message === `Curso con ID ${id} eliminado exitosamente`
      ) {
        navigate('../');
      } else {
        console.log('Error al eliminar el curso', response.data.message);
      }
    } else {
      console.log('Eliminación cancelada.');
    }
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
  }
};