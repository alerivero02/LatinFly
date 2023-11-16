import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export const VuelosPage = () => {
  const [vuelos, setVuelos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/vuelos`)
      .then((response) => setVuelos(response.data));
  },{});
  

  return (
    <>
      <h2>Vuelos Disponibles</h2>
      <ul>
        {vuelos.map((vuelo) => (
          <li key={vuelo.id}>
            {" Pais de origen: "}{vuelo.Pais_Origen}<br/>{" Pais de Destino: "}{vuelo.Pais_Destino}<br/>{"Fecha: "}{ (new Date (vuelo.Fecha)).toLocaleDateString() }<br/>{"Hora de salida: "}{vuelo.HoraSalida}
             <br/> 
             <Link  to="/PasajerosPage">
                <button>Comprar</button>
             </Link>
            <hr/>
          </li>
        ))}
      </ul>
    </>
  );
};
