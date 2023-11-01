import express from "express";
import { db } from "./db.js";

export const vueloRouter = express.Router();

//Se busca el vuelo
//http://localhost:3000/vuelo
vueloRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM vuelo");       //Se crea una constante de filas y columnas y se lo trae desde la DB
  res.send(rows);
});


//Se busca el vuelo por fecha
//http://localhost:3000/vuelo/fecha
vueloRouter.get("/fecha", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT Fecha FROM vuelo");
    res.send(rows);
  });


//Se busca el vuelo por pais de origen
//http://localhost:3000/vuelo/pais_origen
vueloRouter.get("/pais_origen", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT pais_origen FROM vuelo");
    res.send(rows);
  });


//Se busca el vuelo por pais de destino
//http://localhost:3000/vuelo/pais_destino
vueloRouter.get("/pais_destino", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT pais_destino FROM vuelo");
    res.send(rows);
  });
