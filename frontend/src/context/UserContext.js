import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/user-info', { withCredentials: true });
      console.log("Datos del usuario en UserContext:", response.data); // Verifica los datos obtenidos
      setUser(response.data); // Almacena los datos del usuario en el contexto
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      setUser(null); // Si hay error, asegura que user esté en null
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
