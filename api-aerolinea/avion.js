import express from "express";
import { db } from "./db.js";


//http://localhost:3000/avion/nombre

export const avionRouter = express.Router();

avionRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT nombre,capacidad FROM avion");
  res.send(rows);
});

