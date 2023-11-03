import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";

//GET/pasajero
export const pasajeroRouter = express.Router();

pasajeroRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM pasajero");
  res.send(rows);
});


//POST/pasajero
pasajeroRouter.post(      //En body, se indica el campo, luego el tipo de dato, y al ultimo la longitud
    "/",
    body("nombre").isString().isLength({ min: 1, max: 50 }),
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

      const { nombre, documento, telefono, nacionalidad, correo, direccion  } = req.body;   //se crea una constante con los parametros de la tabla
      const [rows] = await db.execute(   //se agrega el pasajero a la fila
        "INSERT INTO pasajero (nombre, documento, telefono, nacionalidad, correo, direccion) VALUES (:nombre, :documento, :telefono, :nacionalidad, :correo, :direccion)",  
        { nombre, documento, telefono, nacionalidad, correo, direccion   }
      );
      res.status(201).send({ nombre, documento, telefono, nacionalidad, correo, direccion, id: rows.insertId });
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

