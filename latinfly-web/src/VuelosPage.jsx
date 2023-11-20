import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Visible } from "./RequireAuth";

export const VuelosPage = () => {
  const [vuelos, setVuelos] = useState([]);
  const [filter, setFilter] = useState("");
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/vuelos`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setVuelos(response.data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredVuelos = vuelos.filter(
    (vuelo) =>
      vuelo.Pais_Destino.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2>Vuelos Disponibles</h2>
      <Visible rol="user">
        <p>Es usuario!</p>
      </Visible>
      <div>
        <label htmlFor="filter">Filtrar por país:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <ul>
        {filteredVuelos.map((vuelo) => (
          <li key={vuelo.idVuelo}>
            {" Pais de origen: "}{vuelo.Pais_Origen}<br/>{" Pais de Destino: "}{vuelo.Pais_Destino}<br/>{"Fecha: "}{(new Date(vuelo.fecha)).toLocaleDateString()}<br/>{"Hora de salida: "}{vuelo.HoraSalida}
            <br/>
            <Link to={`/boletos/${vuelo.idVuelo}`}>
              <button>Seleccionar</button>
            </Link>
            <hr/>
          </li>
        ))}
      </ul>
    </>
  );
};
