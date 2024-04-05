import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState('Light');
  const [activeMenu, setActiveMenu] = useState(true);


  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };


  return (
    <StateContext.Provider value={{ currentMode, activeMenu, setActiveMenu, setCurrentMode }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);