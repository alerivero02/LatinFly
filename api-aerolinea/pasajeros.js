import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";

//GET/pasajeros
export const pasajerosRouter = express.Router();

pasajerosRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM pasajeros");
  res.send(rows);
});

//Se trae el pasajero por ID
pasajerosRouter.get("/:id", async (req, res) => {
  const {id}= req.params; //Se crea la constante id en donde se guarda el id indicado en la ruta para buscar en la base de datos
  const [rows, fields] = await db.execute("SELECT * FROM pasajeros WHERE idPasajero=:id",{id:id});  //Se trae toda la informacion de la tabla pasajeros segun el id indicado
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

      const { nombre, apellido, documento, telefono, nacionalidad, correo, direccion  } = req.body;   //se crea una constante para ingresar los datos
      const [rows] = await db.execute(   //se agrega el pasajeros a la fila
      //Se le insertan los valores a los campos indicados
        "INSERT INTO pasajeros (Nombre, Apellido, Documento, Telefono, Nacionalidad, Correo, Direccion) VALUES (:nombre, :apellido, :documento, :telefono, :nacionalidad, :correo, :direccion)",  
        { nombre:nombre, apellido:apellido, documento:documento, telefono:telefono, nacionalidad:nacionalidad, correo:correo, direccion:direccion   }
      );
      res.status(201).send({ id: rows.insertId, nombre, apellido, documento, telefono, nacionalidad, correo, direccion  });
    }
  );


//Editar 
//Se indican los tipos de datos y los datos 
pasajerosRouter.put("/:id",
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

    const { id } = req.params;  //Se crea la constante id en donde se guarda el id indicado en la ruta para buscar en la base de datos
    const { nombre, apellido, documento, telefono, nacionalidad, correo, direccion  } = req.body;

    // Comprueba si el empleado existe
    const [existingPassenger] = await db.execute("SELECT * FROM pasajeros WHERE idPasajero = :id", { id });
    if (existingPassenger.length === 0) {
      res.status(404).send({ mensaje: "Pasajero no encontrado" });
      return;
    }

    // Actualiza el empleado
    await db.execute(
      //Actualiza los datos anteriores por los datos ingresados
      "UPDATE pasajeros SET Nombre = :nombre, Apellido = :apellido, Documento = :documento, Telefono = :telefono, Nacionalidad= :nacionalidad, Correo = :correo, Direccion = :direccion WHERE idPasajero = :id",
      { id, nombre, apellido, documento, telefono,nacionalidad, correo, direccion }
    );
    res.send({ mensaje: "Pasjero actualizado correctamente" });
  }
);


/* Estructura para el POST y el PUT
-Body
{
  "nombre": ".........",
  "apellido":"...........",
  "documento": "..........",
  "telefono": "..........",
  "nacionalidad": "........",
  "correo": "..............",
  "direccion": "............."
}
*/


