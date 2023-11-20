import express from "express";
import { db } from "./db.js";

export const boletosRouter = express.Router();

//Se busca el boleto por id
//http://localhost:3000/boletos/:id
boletosRouter.get("/:id", async (req, res) => {
  const {id}= req.params; //Se crea la constante id en donde se guarda el id indicado en la ruta para buscar en la base de datos
  const [rows, fields] = await db.execute("SELECT * FROM boletos WHERE idBoleto=:id",{id:id});  //Se trae toda la informacion de la tabla boletos segun el id indicado
  res.send(rows);
});

//Se busca la clase del boleto
//http://localhost:3000/boletos/clase
boletosRouter.get("/clase", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT Clase FROM boletos"); //Se traen todas las clases de los boletos
    res.send(rows);
  });

  boletosRouter.post("/", async (req, res) => {
    try {
      const { idVuelo, valor, asiento, clase } = req.body;  //se crea una constante para ingresar los datos
      if (idVuelo === undefined ||valor === undefined || asiento === undefined || clase === undefined ) {
        throw new Error("Uno o más parámetros son undefined.");
      } 
      const [rows] = await db.execute(   //se agrega el pasajeros a la fila
      //Se le insertan los valores a los campos indicados
        "INSERT INTO boletos ( idVuelo,Valor, Asiento, Clase ) VALUES (:idVuelo,:valor, :asiento, :clase )",  
        { idVuelo:idVuelo,valor:valor, asiento:asiento, clase:clase }
      );
      res.status(201).json({ id: rows.insertId,idVuelo, valor, asiento, clase, message: "Solicitud POST a /boletos manejada con éxito" });
    } catch (error) {
      console.error("Error al manejar la solicitud POST:", error);
      res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
  });