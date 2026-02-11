import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export const LayoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sesion, logout } = useAuthContext();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <span>✈️</span> LatinFly
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/vuelos" className={isActive("/vuelos")}>Vuelos</Link>
          </li>
          <li>
            <Link to="/aviones" className={isActive("/aviones")}>Flota</Link>
          </li>
          {sesion ? (
            <>
              <li>
                <Link to="/nuevo-pasajero" className={isActive("/nuevo-pasajero")}>Pasajeros</Link>
              </li>
              <li>
                <button onClick={() => logout(() => navigate("/"))}>Salir</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/" className={isActive("/")}>Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
