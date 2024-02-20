import axios from "axios";

const handleAdminSignup = async (adminName, password, confirmPassword) => {
    try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.post(
            'https://backdeploy-proyectofinal-utn.up.railway.app/admin/register',
            {
                adminName,
                password,
                confirmPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }
        );

        if (response.data.message === 'Administrador registrado exitosamente') {
            alert('Administrador registrado exitosamente')
            return true;
        } else {
            console.error(response.data.error);
            return false;
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        return false;
    }
};

export default handleAdminSignup;