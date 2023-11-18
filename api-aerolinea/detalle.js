import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";


export const detallesvuelosRouter = express.Router();

//http://localhost:3000/detallesvuelos/:id
//Trae la informacion de vuelo por el id

detallesvuelosRouter.get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {  
    res.status(400).send({ errors: validacion.array() });
    return;
  }
  const { id } = req.params;  //Se crea la constante id en donde se guarda el id indicado en la ruta para buscar en la base de datos
  const [rows, fields] = await db.execute(
    "SELECT * FROM detallesvuelos WHERE idDetalle = :id", //Se trae toda la informacion de detallesvuelos segun el id indicado
    { id }
  );
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Detalle de vuelo no encontrado" });
  }
})