import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [adminIsAuthenticated, setAdminIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [adminId, setAdminId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [adminToken, setAdminToken] = useState('');
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
  
    if (userToken) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUsername(storedUsername);
      console.log("Username from localStorage:", storedUsername);
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
    const storedName = localStorage.getItem('name');
  
    if (adminToken) {
      setAdminIsAuthenticated(true);
      setAdminId(storedAdminId);
      setName(storedName);
      setAdminToken(adminToken);
    } else {
      setAdminIsAuthenticated(false);
      setAdminId('');
      setName('');
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
    setName('');
    navigate('/'); 
  };

  const authContextValue = {
    adminIsAuthenticated,
    setAdminIsAuthenticated,
    userToken,
    adminToken,
    username,
    setUsername,
    name,
    setName,
    isAuthenticated,
    setIsAuthenticated,
    userId,
    setUserId,
    adminId,
    setAdminId,
    handleUserLogout,
    handleAdminLogout,
    searchResults,
    setSearchResults,
  };

  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
};