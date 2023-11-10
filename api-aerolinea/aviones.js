import express from "express";
import { db } from "./db.js";


//http://localhost:3000/avion/nombre

export const avionesRouter = express.Router();

avionesRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT nombre,capacidad FROM aviones");
  res.send(rows);
});

