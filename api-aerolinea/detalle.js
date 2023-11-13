import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";
// instalar express-validator para utilizar las validaciones

export const detallesvuelosRouter = express.Router();

//traer el detalle de vuelo por el id
//http://localhost:3000/detallesvuelos/:idDetalle utilizar en el thunderClient

detallesvuelosRouter.get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errors: validacion.array() });
    return;
  }
  const { id } = req.params;
  const [rows, fields] = await db.execute(
    "SELECT * FROM detallesvuelos WHERE idDetalle = :id",
    { id }
  );
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Detalle de vuelo no encontrado" });
  }
})