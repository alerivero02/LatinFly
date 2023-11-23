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
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },  //Se trae el token 
      })
      .then((response) => setVuelos(response.data));
  }, []);

  const handleFilterChange = (event) => { 
    setFilter(event.target.value);
  };

  const filteredVuelos = vuelos.filter(   //Se crea el filtro para buscar los vuelos
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
          //Se pasa como key el idVuelo
           <li key={vuelo.idVuelo}>  
           {/* Se muestran los datos de los vuelos   */}
            {" Pais de origen: "}{vuelo.Pais_Origen}<br/>{" Pais de Destino: "}{vuelo.Pais_Destino}<br/>{"Fecha: "}{(new Date(vuelo.fecha)).toLocaleDateString()}<br/>{"Hora de salida: "}{vuelo.HoraSalida}
            <br/>
             <Link to={`/boletos/${vuelo.idVuelo}`}>  {/* Se redirecciona a la pagina boletos con id del vuelo elegido */}
              <button>Seleccionar</button>
            </Link>
            <hr/>
          </li>
        ))}
      </ul>
    </>
  );
};
