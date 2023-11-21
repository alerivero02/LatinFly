import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Asegúrate de importar useParams
import axios from "axios";

export const BoletosPage = () => {
  const navigate = useNavigate();
  
  const { idVuelo } = useParams();
  const [formData, setFormData] = useState({
    clase: "",
    asiento: "",
  });
  const [error, setError] = useState(null);
  const [valor, setValor] = useState(0);
  const [claseSel, setClaseSel] = useState();

  const newBol = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Precio = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "100") {
      setClaseSel("Economica");
    } else if (selectedValue === "300") {
      setClaseSel("Ejecutiva");
    } else if (selectedValue === "500") {
      setClaseSel("Primera Clase");
    }
    setFormData(selectedValue)
    setValor(selectedValue);
  };
  //POST
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Datos enviados:", { idVuelo, valor, claseSel, asiento: formData.asiento });
    const response = await axios.post("http://localhost:3000/boletos", {
      idVuelo,
      valor,
      clase: claseSel,
      asiento: formData.asiento,
      });
      
      let idBoleto= response.data.id
      navigate(`/pasajeros/${idBoleto}`);
    } catch (error) {
      setError(error.message);
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <>
      <h1>Seleccione sus preferencias</h1>
      <form onSubmit={onSubmit}>
        <div>
        <br />
          <label htmlFor="clase">Clase:</label>
          <br />
          <select name="clase" onChange={Precio} value={formData.clase}>
            <option value="">Seleccione una clase</option>
            <option value="100">Clase económica</option>
            <option value="300">Clase ejecutiva</option>
            <option value="500">Primera clase</option>
          </select>
          <br />
          <br />

          <label htmlFor="asiento">Asiento:</label> <br />
          <select name="asiento" onChange={newBol} value={formData.asiento}>
            <option value="">Asiento</option>
            <option value="a10">10</option>
            <option value="a11">11</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
          <br />
          <p>Precio: ${valor} </p>
          <button type="submit">Confirmar Boleto</button>
        </div>
      </form>

      {error && <p>Error: {error}</p>}
    </>
  );
};
