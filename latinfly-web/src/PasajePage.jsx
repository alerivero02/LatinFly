import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

export const PasajePage = () => {

 const { idBoleto, idPasajero } = useParams();
 const [boletos, setBoletos] = useState([]);
 const [pasajeros, setPasajeros] = useState([]);
 const [vuelos, setVuelos] = useState([]);
 const navigate = useNavigate();

 useEffect(() => {
    axios
      .get(`http://localhost:3000/pasajeros/${idPasajero}`)
      .then((response) => setPasajeros(response.data));

    axios
      .get(`http://localhost:3000/boletos/${idBoleto}`)
      .then((response) => setBoletos(response.data));

    axios
      .get(`http://localhost:3000/vuelos`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setVuelos(response.data));
 }, []);

 const handleConfirm = () => {
    axios
      .post(`http://localhost:3000/detallesvuelos`, {
        idBoleto:idBoleto,
        idPasajero:idPasajero
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    alert("¡¡¡Compra exitosa!!!")
    navigate("/vuelos");
 };

 return (
    <>
      <div>
        <div className="div2">
          <h3>Detalle de operación</h3>
          {pasajeros.map((pasajero) => (
            <div key={pasajero.idPasajero}>
              <p>Nombre y Apellido: {pasajero.Nombre},{pasajero.Apellido}</p>
              <p>Nro de Documento: {pasajero.Documento}</p>
            </div>
          ))}
          {boletos.map((boleto) => (
            <div key={boleto.idBoleto}>
              <p>Boleto N°{boleto.idBoleto}</p>
              <p>Valor:{" $"}{boleto.Valor} - Asiento: {boleto.Asiento} - Clase: {boleto.Clase}</p>
              {vuelos.map((vuelo) => (
                <div key={vuelo.idVuelo}>
                 {boleto.idVuelo === vuelo.idVuelo && (
                    <>
                      <p>Vuelo N°{vuelo.idVuelo}</p>
                      <p>Origen: {vuelo.Pais_Origen} - Destino: {vuelo.Pais_Destino}</p>
                      <p>Fecha y Hora de Salida: {(new Date(vuelo.fecha)).toLocaleDateString()} - {vuelo.HoraSalida}</p>
                    </>
                 )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <br />
        <button onClick={handleConfirm}>Confirmar</button>
      </div>
    </>
 );
};