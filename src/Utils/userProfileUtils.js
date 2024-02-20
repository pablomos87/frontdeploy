import axios from 'axios';

export const handleEdit = setIsEditing => () => {
    setIsEditing(true);
  };
  
  export const handleSave = (formData, user, setFormData, setIsEditing) => async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      await axios.post('https://backdeploy-proyectofinal-utn.up.railway.app/users/edit', {
        ...formData,
        id: user._id
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };
  
  export const handleChange = (formData, setFormData) => e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };