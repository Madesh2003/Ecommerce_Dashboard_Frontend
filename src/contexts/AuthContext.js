import React, { createContext, useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { decodedToken } = useJwt(sessionStorage.getItem('token') || '');

  useEffect(() => {
    if (decodedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [decodedToken]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
