import express from "express";
import { db } from "./db.js";


export const paisesRouter = express
  .Router()

  .get("/paises", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM aerolinea.paises");
    res.send(rows);
  })