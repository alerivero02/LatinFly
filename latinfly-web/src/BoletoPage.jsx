import React, { useState, useEffect } from "react";
import axios from "axios";


export const BoletosPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [boletos, setBoletos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/boletos`)
      .then((response) => setBoletos(response.data));
  },{});

  const newPas = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/boletos", formData);
      console.log(response.data);// Puedes manejar la respuesta según tus necesidades
      alert("Compra exitosa!") 
    } catch (error) {
      setError(error.message);
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <>
       <ul>
        {boletos.map((boleto) => (
          <li key={boleto.id}>
            {boleto.Clase} , {boleto.Asiento}
          </li>
        ))}
      </ul>

      <h1>Seleccione la informacion del boleto</h1>
      <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="Clase">Seleccione una clase:</label>
            <br />
                <select name="Clase" id="Clase">
                    <option value="economica">Clase economica</option>
                    <option value="ejecutiva">Clase ejecutiva</option>
                    <option value="primera">Primera clase</option>
                </select>
            
        </div>
            <button type="submit">Confirmar Boleto</button>
      </form>

      {error && <p>Error: {error}</p>}
    </>
  );
};

  
