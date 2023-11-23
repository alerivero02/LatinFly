import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export const AuthStatus = () => {
  const { sesion, logout } = useAuthContext();    //Se trae desde AuthContext la Sesion y el Logout
  const navigate = useNavigate();   //El navigate es una funcion que sirve para pasar de una pagina a otra.

  if (!sesion) {       
    return <h6>No esta conectado</h6>;
  }

  return (
    <>
      <h6>{sesion.usuario} <button className="button2" onClick={() => logout(() => navigate("/"))}>Salir</button></h6>
        {/* Al usar el boton se utiliza la funcion navigate para direccionarnos a otra pagina */}
    </>
  );
};
