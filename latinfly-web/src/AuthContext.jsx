import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();  //Se crea el contexto(se utiliza login, logout y sesion)

//AuthProvider es donde se guardan las propiedades de autenticacion 
export const AuthProvider = ({ children }) => { //Children es el que contiene las propiedades
  const [sesion, setSesion] = useState();

  const login = async (usuario, password, callback, error) => { //Se crea un login

    
    try { //Try espera un codigo que puede llegar a tener un error
      const response = await axios.post("http://localhost:3000/auth/login", { //Espera el usuario y la contraseña
        usuario,
        password,
      });
      if (response.data.token) {  //Si tiene un token en los datos setea la sesion con la informacion del token
        setSesion(response.data);
        localStorage.setItem("token",response.data.token) //LocalStorage almacena datos de manera local
        callback();
      }
    } catch (e) { //Catch es el que se encarga de manejar el error
      error();
    }
  };

  const logout = (callback) => {
    setSesion(null);
    localStorage.removeItem("token")  //Si se cierra la sesion se borra el token
    callback();
    
  };

  const value = { sesion, login, logout };  //Es el valor del AuthContext

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; //Se guarda el valor en el AuthContext
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
