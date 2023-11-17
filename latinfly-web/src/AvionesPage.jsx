import { useEffect, useState } from "react";
import axios from "axios";


export const AvionesPage = () => {
  const [Aviones, setAviones] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/aviones`)
      .then((response) => setAviones(response.data));
  },{});
  

  return (
    <>
      <h2>Aviones Disponibles</h2>
      <ul>
        {Aviones.map((Avion) => (
          <li key={Avion.id}>
            {" Modelo: "}{Avion.nombre}<br/>{" Cantidad de asientos: "}{Avion.capacidad}<br/>
             <br/> 
            <hr/>
          </li>
        ))}
      </ul>
    </>
  );
};
