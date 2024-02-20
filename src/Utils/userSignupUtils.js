import axios from "axios"

const handleUserSignup = async (formData, navigate) => {
    try {
      const response = await axios.post('https://backdeploy-proyectofinal-utn.up.railway.app/users/register', formData);
  
      if (response.data.message === 'Registrado exitosamente') {
        navigate(`/signup-success`);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

export default handleUserSignup;