import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { useState } from "react";



export const LoginPage = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);
 
  const from = location.state?.from?.pathname || "/vuelos";

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const usuario = formData.get("usuario");
    const password = formData.get("password");

    login(
      usuario,
      password,
      () => navigate(from, { replace: true }),
      () => setError(true)
    );

    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="div3">
          
          <h1>Iniciar sesion</h1>
        <label htmlFor="usuario">Usuario:</label><br />
        <input name="usuario" type="text" /><br />
        <label htmlFor="password">Contraseña:</label><br />
        <input name="password" type="password" /><br />
        <br /><button type="submit">Ingresar</button>
        </div>
        
        
      </form>
      {error && <p>Usuario o contraseña inválido</p>}
    </>
  );
};
