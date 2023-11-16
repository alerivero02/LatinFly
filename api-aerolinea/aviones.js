import express from "express";
import { db } from "./db.js";


//http://localhost:3000/aviones

export const avionesRouter = express.Router();

avionesRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT nombre,capacidad FROM aviones");
  res.send(rows);
});

//Se busca por id
//http://localhost:3000/aviones/id

avionesRouter.get("/:id", async (req, res) => {
  const {id}= req.params;
  const [rows, fields] = await db.execute("SELECT Nombre,Capacidad FROM aviones WHERE idAvion=:id",{id:id});
  res.send(rows);
});

