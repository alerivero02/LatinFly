import express from "express";
import { db } from "./db.js";

export const vuelosRouter = express.Router();

//Se busca el vuelos
//http://localhost:3000/vuelos
vuelosRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT Fecha,HoraSalida, p.Nombre as Pais_Origen, p2.Nombre as Pais_Destino FROM aerolinea.vuelos as v INNER JOIN paises as p ON p.id = v.Pais_origen INNER JOIN paises as p2 ON p2.id = v.Pais_destino;");       //Se crea una constante de filas y columnas y se lo trae desde la DB
  res.send(rows);
});



