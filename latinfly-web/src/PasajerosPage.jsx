import React, { useState, useEffect } from "react";
import axios from "axios";


export const PasajerosPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [pasajeros, setPasajeros] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/pasajeros`)
      .then((response) => setPasajeros(response.data));
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
      const response = await axios.post("http://localhost:3000/pasajeros", formData);
      console.log(response.data);// Puedes manejar la respuesta según tus necesidades
      alert("Pasajero Cargado con exito") 
    } catch (error) {
      setError(error.message);
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <>
       <ul>
        {pasajeros.map((pasajero) => (
          <li key={pasajero.id}>
            {pasajero.Nombre} , {pasajero.Apellido}, {pasajero.Documento}
          </li>
        ))}
      </ul>

      <h1>Ingrese Datos del Pasajero</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input name="nombre" type="text" onChange={newPas} required />
        <br/>
        <label htmlFor="apellido">Apellido:</label>
        <input name="apellido" type="text" onChange={newPas} required />
        <br/>
        <label htmlFor="documento">Documento:</label>
        <input name="documento" type="text" onChange={newPas} required />
        <br/>
        <label htmlFor="telefono">telefono:</label>
        <input name="telefono" type="text" onChange={newPas} required />
        <br/>
        <label htmlFor="nacionalidad">nacionalidad:</label>
        <input name="nacionalidad" type="text" onChange={newPas} required />
        <br/>
        <label htmlFor="correo">correo:</label>
        <input name="correo" type="text" onChange={newPas} required />
        <br/>
        <label htmlFor="direccion">direccion:</label>
        <input name="direccion" type="text" onChange={newPas} required />
        <br/>
        
            <button type="submit">Agregar Pasajero</button>
      </form>

      {error && <p>Error: {error}</p>}
    </>
  );
};

