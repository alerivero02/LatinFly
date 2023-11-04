import "dotenv/config";
import express from "express";
import cors from "cors";
import { paisesRouter } from "./paises.js";
import { avionRouter } from "./avion.js";
import {boletoRouter} from "./boleto.js"
import { vueloRouter } from "./vuelo.js";
import { detallevueloRouter } from "./detalle.js";
import { empleadoRouter } from "./empleado.js";
import { authConfig, authRouter } from "./auth.js";



// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());

authConfig();

app.use("/auth", authRouter);
app.use("/paises", paisesRouter);
app.use("/aviones",avionRouter);
app.use("/boleto", boletoRouter);
app.use("/vuelo", vueloRouter);
app.use("/detallevuelo", detallevueloRouter);
app.use("/empleado", empleadoRouter)

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});