import express from "express";
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const empleadosRouter = express.Router();

//POST/empleados
empleadosRouter.post("/",   //Se crea un post para agregar personas a la tabla empleados
body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
body("password").isStrongPassword({   //Se le indican las restricciones de la contraseña
  minLength: 8,   //Minimo 8 caracteres
  minLowercase: 1,  //Minimo una minuscula
  minUppercase: 1,  //Minimo una mayuscula
  minNumbers: 1,    //Minimo un numero
  minSymbols: 0,
}),

async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errors: validacion.array() });
    return;
    } console.log(req.body);
    const { usuario, password,nombre, apellido, documento, telefono, correo, direccion } = req.body;  //Se crean las constantes para indicar los valores en el body
    const passwordHashed = await bcrypt.hash(password, 8);  //Se encripta la contraseña
    const [rows] = await db.execute(
      //Se le indican los valores ingresados a las constantes del body anteriormente creadas
      "INSERT INTO empleados ( Usuario, Password, Nombre, Apellido, Documento, Telefono, Correo, Direccion) VALUES (:usuario, :password, :nombre, :apellido, :documento,:telefono,:correo,:direccion)",
      { usuario:usuario, password: passwordHashed,nombre:nombre, apellido:apellido, documento:documento, direccion:direccion, telefono:telefono, correo:correo }
    );
    res.status(201).send({ id: rows.insertId, usuario, nombre, apellido, documento, direccion, telefono, correo }); //Si todo esta correcto se envia a la base de datos y devuelve un mensaje positivo
  }
)



//GET/empleados
//Se traen todos los empleados de la tabla empleados
empleadosRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM empleados");
  res.send(rows);
});

empleadosRouter.get("/:id", async (req, res) => {
  const {id}= req.params; //Se crea la constante id en donde se guarda el id indicado en la ruta para buscar en la base de datos
  const [rows, fields] = await db.execute("SELECT nombre, apellido, documento, telefono, correo, direccion, usuario FROM empleados WHERE idEmpleado=:id",{id:id});  //Se traen los datos del id indicado de la tabla empleados 
  res.send(rows);
});



/* Estructura para el POST y el PUT
-Body
{
  "nombre": ".........",
  "apellido":"......",
  "documento": "..........",
  "telefono": "..........",
  "correo": "..............",
  "direccion": ".............",
  "usuario":"..........",
  "password":"........"
}
*/

//Eliminar 
empleadosRouter.delete("/:id", param("id").isInt({ min: 1 }), async (req, res) => { //Solo se podra borrar si es que existe por lo menos un id
  const { id } = req.params;  //Se crea la constante id en donde se guarda el id indicado en la ruta para buscar en la base de datos
  await db.execute("DELETE FROM empleados WHERE idEmpleado = :id", { id:id });  //Se elimina el empleado seleccionado por el id
  res.send("ok"); //Si funciona correctamente se envia un mensaje
});

//Editar
empleadosRouter.put("/:id",
  param("id").isInt({ min: 1 }),  //Se crea la constante id en donde se guarda el id indicado en la ruta para buscar en la base de datos
  body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
  body("password").isStrongPassword({//Se le indican las restricciones de la contraseña
    minLength: 8,     //Minimo 8 caracteres
    minLowercase: 1,  //Minimo una minuscula
    minUppercase: 1,  //Minimo una mayuscula  
    minNumbers: 1,    //Minimo un numero
    minSymbols: 0,
  }),    

  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }

    const { id } = req.params;  
    const { usuario, password, nombre, apellido, documento, telefono, correo, direccion } = req.body;   //Se indican las constantes que iran el el body para editar los datos

    // Comprueba si el empleado existe
    const [existingEmployee] = await db.execute("SELECT * FROM empleados WHERE idEmpleado = :id", { id });  //Compara el id indicado en la ruta con la base de datos para ver si existe o no el empleado
    if (existingEmployee.length === 0) {
      res.status(404).send({ mensaje: "Empleado no encontrado" });  //Si e empleado no existe envia un mensaje
      return;
    }

    // Actualiza el empleado
    const passwordHashed = await bcrypt.hash(password, 8);
    await db.execute(
      //Se cambian los datos viejos de la base de dato por los nuevos datos
      "UPDATE empleados SET Usuario = :usuario, Password = :password, Nombre = :nombre, Apellido = :apellido, Documento = :documento, Telefono = :telefono, Correo = :correo, Direccion = :direccion WHERE idEmpleado = :id",
      { id, usuario, password: passwordHashed, nombre, apellido, documento, telefono, correo, direccion }
    );  

    res.send({ mensaje: "Empleado actualizado correctamente" });  //Si todo funciona correctamente se envia un mensaje
  }
);

