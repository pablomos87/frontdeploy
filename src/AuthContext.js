import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

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
  

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    console.log('Usertoken:', userToken);
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (userToken) {
      setIsAuthenticated(true);
      setAdminIsAuthenticated(false);
      setUserId(storedUserId);
      setUsername(storedUsername);
      setName('');
      setAdminId('');
      setUserToken (userToken)
      localStorage.removeItem('adminToken');
    } else {
      setIsAuthenticated(false);
      setUserId('');
      setUsername('');
    }
  }, []);

 useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const storedAdminId = localStorage.getItem('adminId');
    const storedName = localStorage.getItem('name');

    if (adminToken) {
      setAdminIsAuthenticated(true);
      setIsAuthenticated(false);
      setUserId('');
      setUsername('');
      setAdminId(storedAdminId);
      setName(storedName);
      setAdminToken (adminToken)
      localStorage.removeItem('userToken');
    } else {
      setAdminIsAuthenticated(false);
      setAdminId('');
      setName('');
    }
  }, []);
 
  const handleUserLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setUserId('');
    setUsername('');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminIsAuthenticated(false);
    setAdminId('');
    setName('');
    <Navigate to="/"/>
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
  };

  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
};