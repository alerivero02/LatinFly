import express from "express";
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const empleadosRouter = express.Router();

//POST/empleados
empleadosRouter.post("/",
body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
body("password").isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
}),

async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errors: validacion.array() });
    return;
    } console.log(req.body);
    const { usuario, password,nombre, apellido, documento, telefono, correo, direccion } = req.body;
    const passwordHashed = await bcrypt.hash(password, 8);
    const [rows] = await db.execute(
      "INSERT INTO empleados ( Usuario, Password, Nombre, Apellido, Documento, Telefono, Correo, Direccion) VALUES (:usuario, :password, :nombre, :apellido, :documento,:telefono,:correo,:direccion)",
      { usuario:usuario, password: passwordHashed,nombre:nombre, apellido:apellido, documento:documento, direccion:direccion, telefono:telefono, correo:correo }
    );
    res.status(201).send({ id: rows.insertId, usuario, nombre, apellido, documento, direccion, telefono, correo });
  }
)



//GET/empleados

empleadosRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM empleados");
  res.send(rows);
});

empleadosRouter.get("/:id", async (req, res) => {
  const {id}= req.params;
  const [rows, fields] = await db.execute("SELECT nombre, apellido, documento, telefono, correo, direccion, usuario FROM empleados WHERE idEmpleado=:id",{id:id});
  res.send(rows);
});



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

//Eliminar 
empleadosRouter.delete("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
  const { id } = req.params;
  await db.execute("DELETE FROM empleados WHERE idEmpleado = :id", { id:id });
  res.send("ok");
});

//Editar
empleadosRouter.put("/:id",
  param("id").isInt({ min: 1 }),
  body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  }),

  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }

    const { id } = req.params;
    const { usuario, password, nombre, apellido, documento, telefono, correo, direccion } = req.body;

    // Comprueba si el empleado existe
    const [existingEmployee] = await db.execute("SELECT * FROM empleados WHERE idEmpleado = :id", { id });
    if (existingEmployee.length === 0) {
      res.status(404).send({ mensaje: "Empleado no encontrado" });
      return;
    }

    // Actualiza el empleado
    const passwordHashed = await bcrypt.hash(password, 8);
    await db.execute(
      "UPDATE empleados SET Usuario = :usuario, Password = :password, Nombre = :nombre, Apellido = :apellido, Documento = :documento, Telefono = :telefono, Correo = :correo, Direccion = :direccion WHERE idEmpleado = :id",
      { id, usuario, password: passwordHashed, nombre, apellido, documento, telefono, correo, direccion }
    );

    res.send({ mensaje: "Empleado actualizado correctamente" });
  }
);

/* Como se edita, PUT 
-Body

{
  "nombre": "edit",
  "documento": "edit",
  "telefono": "edit",
  "correo": "edit",
  "direccion": "edit" ... etc
}

*/
