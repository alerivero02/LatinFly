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
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const usuario = formData.get("usuario");
    const password = formData.get("password");

    login(
      usuario,
      password,
      () => navigate(from, { replace: true }),
      () => setError(true)
    );
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <span className="icon">✈️</span>
          <h1>LatinFly</h1>
          <p>Plataforma de gestión de vuelos</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              name="usuario"
              type="text"
              placeholder="Ingresa tu usuario"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>

        {error && (
          <p className="login-error">Usuario o contraseña inválido</p>
        )}
      </div>
    </div>
  );
};
