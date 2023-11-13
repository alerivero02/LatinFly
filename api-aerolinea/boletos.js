import express from "express";
import { db } from "./db.js";

export const boletosRouter = express.Router();

//Se busca el id del boleto
//http://localhost:3000/boletos/:id
boletosRouter.get("/:id", async (req, res) => {
  const {id}= req.params;
  const [rows, fields] = await db.execute("SELECT * FROM boletos WHERE idBoleto=:id",{id:id});
  res.send(rows);
});

//Se busca la clase del boleto
//http://localhost:3000/boletos/Clase
boletosRouter.get("/clase", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT Clase FROM boletos");
    res.send(rows);
  });
