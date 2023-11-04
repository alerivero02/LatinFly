import express from "express";
import { db } from "./db.js";

export const boletoRouter = express.Router();

//Se busca el id del boleto
//http://localhost:3000/boleto/:id
boletoRouter.get("/:id", async (req, res) => {
  const id= req.params("id");
  const [rows, fields] = await db.execute("SELECT * FROM boleto WHERE idBoleto=:id",{id:id});
  res.send(rows);
});

//Se busca la clase del boleto
//http://localhost:3000/boleto/Clase
boletoRouter.get("/clase", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT Clase FROM boleto");
    res.send(rows);
  });
