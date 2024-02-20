import axios from "axios";



const handleAdminLogin = async (adminName, password, setUserId, setUsername, setAdminId, setParentAdminName, setIsAuthenticated, setAdminIsAuthenticated, navigate) => {
    try {
      const response = await axios.post('https://backdeploy-proyectofinal-utn.up.railway.app/admin/login', {
        adminName,
        password,
      });
  
      if (response.data && response.data.adminToken) {
        const { adminToken, adminId } = response.data;

        setUserId('');
        setUsername('');
        setAdminId(adminId);
        setParentAdminName(adminName);
        setAdminIsAuthenticated(true);
        setIsAuthenticated (false);
      
        localStorage.removeItem('userToken');
        localStorage.setItem('adminToken', adminToken);
        localStorage.setItem('adminId', adminId);
        localStorage.setItem('adminName', adminName);
        navigate('/admin/');
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Nombre de usuario o contraseña incorrectos');
      } else {
        alert('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

export default handleAdminLogin;