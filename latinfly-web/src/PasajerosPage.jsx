import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export const PasajerosPage = () => {
  const {idBoleto} = useParams();
  const [pasajeros, setPasajeros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    axios
      .get(`http://localhost:3000/pasajeros`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setPasajeros(response.data));
  }, []);




  const filteredPasajeros = pasajeros.filter(
    (pasajero) =>
      pasajero.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasajero.Apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasajero.Documento.includes(searchTerm)
  );

  return (
    <>
      
      <h3>Seleccione un pasajero:</h3>
      <input
        type="text"
        placeholder="Buscar pasajero"
        onChange={(e) => setSearchTerm(e.target.value)}
      /> <br />
      <div className="div2">
        <ul>
          {filteredPasajeros.map((pasajero) => (
            <li key={pasajero.idPasajero}>
              {pasajero.Nombre}, {pasajero.Apellido} - {pasajero.Documento}
              <Link to={`/pasaje/${idBoleto}/${pasajero.idPasajero}`}>
                <input type="radio" />
              </Link>
            </li>
          ))}
        </ul>

      </div>
      
      </>
      );};
