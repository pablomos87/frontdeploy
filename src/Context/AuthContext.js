import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [adminIsAuthenticated, setAdminIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [adminName, setAdminName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [adminId, setAdminId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [adminToken, setAdminToken] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
  
    if (userToken) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUsername(storedUsername);
      setUserToken(userToken);
      
    } else {
      setIsAuthenticated(false);
      setUserId('');
      setUsername('');
    }
  }, [setIsAuthenticated]);
  
  

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const storedAdminId = localStorage.getItem('adminId');
    const storedAdminName = localStorage.getItem('adminName');
  
    if (adminToken) {
      setAdminIsAuthenticated(true);
      setAdminId(storedAdminId);
      setAdminName(storedAdminName);
      setAdminToken(adminToken);
    } else {
      setAdminIsAuthenticated(false);
      setAdminId('');
      setAdminName('');
    }
  }, [setAdminIsAuthenticated]);

  
  const handleUserLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setUserId('');
    setUsername('');
    /* window.location.reload(); */
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminIsAuthenticated(false);
    setAdminId('');
    setAdminName('');
    navigate('/'); 
  };

  const authContextValue = {
    adminIsAuthenticated,
    setAdminIsAuthenticated,
    userToken,
    adminToken,
    username,
    setUsername,
    adminName,
    setAdminName,
    isAuthenticated,
    setIsAuthenticated,
    userId,
    setUserId,
    adminId,
    setAdminId,
    handleUserLogout,
    handleAdminLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
};