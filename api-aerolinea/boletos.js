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
