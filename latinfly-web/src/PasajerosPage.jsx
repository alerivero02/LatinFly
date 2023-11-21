import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";


export const PasajerosPage = () => {
  const {idBoleto} = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [pasajeros, setPasajeros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const nombreRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/pasajeros`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setPasajeros(response.data));
  }, []);

  const newPas = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/pasajeros",
        formData
      );
      console.log(response.data);
      alert("Pasajero Cargado con éxito");
      setFormData({});
      nombreRef.current.focus();
      // Desplazarse hacia abajo hasta el formulario
      formRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setError(error.message);
      console.error("Error al enviar la solicitud:", error);
    }
  };

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
      />
      <button onClick={() => {
        nombreRef.current.focus();
        
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }}>Nuevo Pasajero</button>
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
      

      <h3>Ingresa los datos</h3>
      <form onSubmit={onSubmit} ref={formRef}>
        <label htmlFor="nombre">Nombre:</label>
        <input name="nombre" type="text" onChange={newPas} ref={nombreRef} required />
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
      );};
