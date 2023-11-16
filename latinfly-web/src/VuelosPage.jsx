import { useEffect, useState } from "react";
import axios from "axios";

export const VuelosPage = () => {
  const [vuelos, setVuelos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/vuelos`)
      .then((response) => setVuelos(response.data));
  },);
  

  return (
    <>
      <h2>Vuelos</h2>
      <ul>
        {vuelos.map((vuelo) => (
          <li key={vuelo.id}>
            {"Fecha: "}{ vuelo.fecha}<br/>{"Hora de salida: "}{vuelo.HoraSalida}<br/>{" Pais de origen: "}{vuelo.Pais_Origen}<br/>{" Pais de Destino: "}{vuelo.Pais_Destino}<hr/>
          </li>
        ))}
      </ul>
    </>
  );
};
