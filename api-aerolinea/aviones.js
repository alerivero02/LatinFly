import express from "express";
import { db } from "./db.js";


//http://localhost:3000/aviones
export const avionesRouter = express.Router();

//Se crea la ruta para traer todos los aviones
avionesRouter.get("/", async (req, res) => {  
  const [rows, fields] = await db.execute("SELECT nombre,capacidad FROM aviones");  //Se trae el nombre y la capacidad de la tabla aviones
  res.send(rows);
});

//Se busca por id
//http://localhost:3000/aviones/id
avionesRouter.get("/:id", async (req, res) => {
  const {id}= req.params; //Se crea la constante id en donde se guarda el id indicado en la ruta para buscar en la base de datos
  const [rows, fields] = await db.execute("SELECT Nombre,Capacidad FROM aviones WHERE idAvion=:id",{id:id});  //Se trae el nombre y la capacidad del id del avion correspondiente
  res.send(rows);
});

