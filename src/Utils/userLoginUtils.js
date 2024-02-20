import axios from "axios";

const handleUserLogin = async (username, password, setAdminId, setAdminName, setUserId, setParentUsername, setIsAuthenticated, setAdminIsAuthenticated, navigate, location) => {
  
  
  try {
    const response = await axios.post("https://backdeploy-proyectofinal-utn.up.railway.app/users/login", {
      username,
      password,
      
    })
    ;

    if (response.data && response.data.userToken) {
      const { userToken, userId } = response.data;

      setAdminId('');
      setAdminName('');
      setUserId(userId);
      setParentUsername(username);
      setIsAuthenticated(true);
      setAdminIsAuthenticated(false);

      localStorage.removeItem('adminToken');
      localStorage.setItem('userToken', userToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);

      navigate(location.state?.from || '/');
    } else {
      alert('Inicio de sesión fallido. Usuario o contraseña incorrectos.');
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert('Inicio de sesión fallido. Usuario o contraseña incorrectos.');
  }
};

export default handleUserLogin;