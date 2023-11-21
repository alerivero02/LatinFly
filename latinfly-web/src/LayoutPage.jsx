import { Link,useNavigate, Outlet } from "react-router-dom";
import { AuthStatus } from "./AuthStatus";




export const LayoutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      
      <nav>
        <img src="icono.ico"width={100} onClick={()=> navigate("/")}/>
        <ul>
          <li>
            <Link to="/vuelos">Vuelos</Link>
          </li>
          <li>
            <Link to="/boletos/:idVuelo">Boletos</Link>
          </li>
          <li>
            <Link to="/pasajeros/:idBoleto">Pasajeros</Link>
          </li>
          <li>
            <Link to="/aviones">Aviones</Link>
          </li>
          <AuthStatus />
        </ul>
      </nav>
      
      <Outlet />
    </>
  );
};