import express from "express";
import { db } from "./db.js";


export const paisesRouter = express.Router();


paisesRouter.get("/", async (req, res) => {   //Se traen todos los paises
  const [rows, fields] = await db.execute("SELECT * FROM paises");
  res.send(rows);
});

