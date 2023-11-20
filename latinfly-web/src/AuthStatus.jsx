import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export const AuthStatus = () => {
  const { sesion, logout } = useAuthContext();
  const navigate = useNavigate();

  if (!sesion) {
    return <h6>No esta conectado</h6>;
  }

  return (
    <>
      <h6>{sesion.usuario} <button2 onClick={() => logout(() => navigate("/"))}>Salir</button2></h6>
      
    </>
  );
};
