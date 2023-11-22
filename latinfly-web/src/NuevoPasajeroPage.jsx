import { useState, useRef} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const AgregarPasajero = () => {
 const [formData, setFormData] = useState({});
 const [error, setError] = useState("");
 const nombreRef = useRef();
 const formRef = useRef();

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

 return (
    <>  
      <h2>¿Primera vez que viaja con nosotros?</h2>
      
      <div>
            <form className="formP"onSubmit={onSubmit} ref={formRef}>
                <h3>Ingresa los datos</h3>
                <label className="labelP" htmlFor="nombre">Nombre:</label><input name="nombre" type="text" onChange={newPas} ref={nombreRef} required />
                <br/>
                <label className="labelP" htmlFor="apellido">Apellido:</label>
                <input name="apellido" type="text" onChange={newPas} required />
                <br/>
                <label className="labelP" htmlFor="documento">Documento:</label>
                <input name="documento" type="text" onChange={newPas} required />
                <br/>
                <label className="labelP" htmlFor="telefono">Telefono:</label>
                <input name="telefono" type="text" onChange={newPas} required />
                <br/>
                <label className="labelP" htmlFor="nacionalidad">Nacionalidad:</label>
                <input name="nacionalidad" type="text" onChange={newPas} required />
                <br/>
                <label className="labelP" htmlFor="correo">Correo:</label>
                <input name="correo" type="text" onChange={newPas} required />
                <br/>
                <label className="labelP" htmlFor="direccion">Direccion:</label>
                <input name="direccion" type="text" onChange={newPas} required />
                <br/>
                <br />
                <button type="submit">Agregar Pasajero</button>
            </form>
            
            </div>
            <Link to="/vuelos">
            <button>Viajó con nosotros</button>
            </Link>
            

            {error && <p>Error: {error}</p>}
   
      </>

);};