import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

//GET/empleado
export const empleadoRouter = express.Router();

empleadoRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM empleado");
  res.send(rows);
});


//POST/empleado
empleadoRouter.post(      //En body, se indica el campo, luego el tipo de dato, y al ultimo la longitud
    "/",
    body("nombre").isString().isLength({ min: 1, max: 50 }),
    body("documento").isString().isLength({ min: 1, max: 50 }),
    body("telefono").isString().isLength({ min: 1, max: 20 }),
    body("correo").isString().isLength({ min: 1, max: 50 }),
    body("direccion").isString().isLength({ min: 1, max: 50 }),
    body("direccion").isString().isLength({ min: 1, max: 50 }),
    body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
    body("contraseña").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    }),


    body("idEmpleado").isInt({ min: 1 }),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }

      const { nombre, documento, telefono,  correo, direccion, usuario, contraseña, idEmpleado  } = req.body;
      const contraseñaHashed = await bcrypt.hash(contraseña, 8);   //se crea una constante con los parametros de la tabla
      const [rows] = await db.execute(   //se agrega el empleado a la fila
        "INSERT INTO empleado (nombre, documento, telefono,  correo, direccion, idEmpleado,usuario,contraseña) VALUES(:nombre, :documento, :telefono, : :correo, :direccion, :usuario, :contraseña, :idEmpleado)",  
        { nombre, documento, telefono,  correo, direccion, usuario, contraseña: contraseñaHashed , idEmpleado }
      );
      res.status(201).send({ nombre, documento, telefono,  correo, direccion, usuario, contraseña, id: rows.insertId, idEmpleado});
    }
  );





/* Como se agrega, POST 
-Body

{
  "nombre": ".........",
  "documento": "..........",
  "telefono": "..........",
  "correo": "..............",
  "direccion": "............." ... etc
}

*/