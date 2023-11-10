import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";

//GET/pasajeros
export const pasajerosRouter = express.Router();

pasajerosRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM pasajeros");
  res.send(rows);
});


//POST/pasajeros
pasajerosRouter.post(      //En body, se indica el campo, luego el tipo de dato, y al ultimo la longitud.
    "/",
    body("nombre").isString().isLength({ min: 1, max: 50 }),
    body("apellido").isString().isLength({ min: 1, max: 50 }),
    body("documento").isString().isLength({ min: 1, max: 50 }),
    body("telefono").isInt().isLength({ min: 1, max: 11 }),
    body("nacionalidad").isString().isLength({ min: 1, max: 20 }),
    body("correo").isString().isLength({ min: 1, max: 50 }),
    body("direccion").isString().isLength({ min: 1, max: 50 }),


    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }

      const { nombre, apellido, documento, telefono, nacionalidad, correo, direccion  } = req.body;   //se crea una constante con los parametros de la tabla
      const [rows] = await db.execute(   //se agrega el pasajeros a la fila
        "INSERT INTO pasajeros (nombre, apellido, documento, telefono, nacionalidad, correo, direccion) VALUES (:nombre, :apellido, :documento, :telefono, :nacionalidad, :correo, :direccion)",  
        { nombre, apellido, documento, telefono, nacionalidad, correo, direccion   }
      );
      res.status(201).send({ nombre, apellido, documento, telefono, nacionalidad, correo, direccion, id: rows.insertId });
    }
  );





/* Como se agrega, POST 
-Body
{
  "nombre": ".........",
  "documento": "..........",
  "telefono": "..........",
  "nacionalidad": "........",
  "correo": "..............",
  "direccion": "............."
}
*/

