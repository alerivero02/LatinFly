import express from "express";
import { db } from "./db.js";
import passport  from "passport";

export const vuelosRouter = express.Router();

//Se busca el vuelos
//http://localhost:3000/vuelos
vuelosRouter.get("/",
passport.authenticate("jwt", { session: false }),
 async (req, res) => {  
  //Se realiza un inner join para juntar las tablas y poder traer los datos
  const [rows, fields] = await db.execute("SELECT idVuelo,fecha,HoraSalida, p.Nombre as Pais_Origen, p2.Nombre as Pais_Destino FROM aerolinea.vuelos as v INNER JOIN paises as p ON p.id = v.Pais_origen INNER JOIN paises as p2 ON p2.id = v.Pais_destino;");       //Se crea una constante de filas y columnas y se lo trae desde la DB
  res.send(rows);
});



