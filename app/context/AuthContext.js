// context/AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Splash from '../screens/Splash';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  //Comprobar sesion
  useEffect(() => {
    AsyncStorage.getItem("user")
    .then(_usr => {
      if(_usr) {
        setUser(JSON.parse(_usr));
      }
    })
    .finally(() => {
      setTimeout(() => {
        setReady(true);
      }, 2000);
    })
  },[])

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    AsyncStorage.removeItem("user")
    .then(() => {
      setUser(null);
    })
  };

  if (!ready){
    return <Splash/>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
