import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { db } from "./db.js";

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      const [rows, fields] = await db.execute(
        "SELECT usuario FROM empleado WHERE usuario = :usuario",
        { usuario: payload.usuario }
      );
      if (rows.length > 0) {
        next(null, rows[0]);
      } else {
        next(null, false);
      }
    })
  );
}

export const authRouter = express
  .Router()

  .post(
    "/login",
    body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
    body("contraseña").isStrongPassword({
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

      const { usuario, contraseña } = req.body;

      // Obtengo cuenta de usuario
      const [rows, fields] = await db.execute(
        "SELECT usuario, contraseña FROM empleado WHERE usuario = :usuario",
        { usuario }
      );
      if (rows.length === 0) {
        res.status(400).send("Usuario o contraseña inválida");
        return;
      }

      // Verificar contraseña
      const contraseñaCompared = await bcrypt.compare(contraseña, rows[0].contraseña);
      if (!contraseñaCompared) {
        res.status(400).send("Usuario o contraseña inválida");
        return;
      }

      // Generar token
      const payload = { usuario };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.send({ usuario, token });
    }
  )

  .get(
    "/perfil",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json(req.user);
    }
  );