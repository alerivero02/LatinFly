import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from "./AuthStatus";

export const Layout = () => {
  return (
    <>
      <AuthStatus />
      <nav>
        <ul>
          <li>
            <Link to="/vuelos">Vuelos</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
