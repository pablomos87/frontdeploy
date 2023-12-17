/* import React, { createContext, useState, useEffect, useContext  } from 'react';
import { useLocation } from 'react-router-dom'; 
import Spinner from 'react-bootstrap/Spinner'; 

export const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true); 
    console.log('isLoading establecido en true debido a un cambio de ubicación');
  }, [location]);

  const setLoadingFalse = () => {
    setIsLoading(false);
    console.log('isLoading establecido en false después de la carga de datos');
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoadingFalse }}>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        children
      )}
    </LoadingContext.Provider>
  );
}; */