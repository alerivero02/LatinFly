import express from "express";
import { db } from "./db.js";

export const vuelosRouter = express.Router();

//Se busca el vuelos
//http://localhost:3000/vuelos
vuelosRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM vuelos");       //Se crea una constante de filas y columnas y se lo trae desde la DB
  res.send(rows);
});


//Se busca el vuelos por fecha
//http://localhost:3000/vuelos/fecha
vuelosRouter.get("/fecha", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT Fecha FROM vuelos");
    res.send(rows);
  });


//Se busca el vuelos por pais de origen
//http://localhost:3000/vuelos/pais_origen
vuelosRouter.get("/pais_origen", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT pais_origen FROM vuelos");
    res.send(rows);
  });


//Se busca el vuelos por pais de destino
//http://localhost:3000/vuelos/pais_destino
vuelosRouter.get("/pais_destino", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT pais_destino FROM vuelos");
    res.send(rows);
  });
