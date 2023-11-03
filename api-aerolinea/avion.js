import express from "express";
import { db } from "./db.js";


//http://localhost:3000/avion/nombre

export const avionRouter = express.Router();

avionRouter.get("/nombre", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT nombre FROM avion");
  res.send(rows);
});


//http://localhost:3000/avion/capacidad

avionRouter.get("/capacidad", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT capacidad FROM avion");
    res.send(rows);
  });
  