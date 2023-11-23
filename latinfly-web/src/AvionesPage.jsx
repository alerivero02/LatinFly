import { useEffect, useState } from "react";
import axios from "axios";


export const AvionesPage = () => {
  const [Aviones, setAviones] = useState([]);

  useEffect(() => { 
    axios
      .get(`http://localhost:3000/aviones`)   //Se traen todos los aviones de la base de datos
      .then((response) => setAviones(response.data));
  },[]);
  

  return (
    <>
      <h2>Aviones Disponibles</h2>
      <ul>
        {Aviones.map((Avion) => (   //Se crea un map para mostrar los aviones
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
