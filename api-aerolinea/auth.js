import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { db } from "./db.js";

//AUTENTICACION

// Configuración de Passport
export function authConfig() {    
  const jwtOptions = {    //Guardamos el token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Se extrae el token, que esta en el encabezado  
    secretOrKey: process.env.JWT_SECRET,  //Especifica la clave secreta que utilizaremos 
  };
  //La clave secreta se utiliza para verificar y firmar el token

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      const [rows, fields] = await db.execute(
        "SELECT idEmpleado, usuario FROM empleados WHERE usuario = ?",  //Se pregunta si el usuario coincide con el token
        [payload.usuario] //Payload es el contenido del token(en este caso el usuario)
      );
      if (rows.length > 0) {
        next(null, rows[0]);  //Es valido
      } else {
        next(null, false);    //Es invalido
      }
    })
  );
}

// Configuración del enrutador de autenticación
export const authRouter = express
  .Router()

    //VERIFICACION


  // Endpoint de inicio de sesión
  .post(  //Se verifican los datos ingresados
    "/login",
    body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
    body("password").isStrongPassword({ //Se definen las condiciones minimas de la contraseña
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

      const { usuario, password } = req.body;

      // Obtener cuenta de usuario
      const [rows, fields] = await db.execute(
        "SELECT idEmpleado, usuario, password FROM empleados WHERE usuario = ?",
        [usuario]
      );

      if (rows.length === 0) {  //Si no ingresa nada sera error
        res.status(400).send("Usuario o contraseña inválida");
        return;
      }

      // Verificar contraseña
      const passwordCompared = await bcrypt.compare(password, rows[0].password);  //El bcrypt se utiliza para comparar la contraseña encriptada
      if (!passwordCompared) {
        res.status(400).send("Usuario o contraseña inválida");
        return;
      }

      // Generar token
      const payload = { usuario };  //Se guarda el token del usuario
      const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: "2h",  //Si pasan 2 horas el token expira
      });
      res.send({ usuario, token });
    }
  )

  