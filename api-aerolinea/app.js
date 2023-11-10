import "dotenv/config";
import express from "express";
import cors from "cors";
import { paisesRouter } from "./paises.js";
import { avionesRouter } from "./aviones.js";
import {boletosRouter} from "./boletos.js"
import { vuelosRouter } from "./vuelos.js";
import { detallesvuelosRouter } from "./detalle.js";
import { empleadosRouter } from "./empleados.js";
import { pasajerosRouter } from "./pasajeros.js";
import { authConfig, authRouter } from "./auth.js";



// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());

authConfig();

app.use("/auth", authRouter);
app.use("/paises", paisesRouter);
app.use("/aviones",avionesRouter);
app.use("/boleto", boletosRouter);
app.use("/vuelo", vuelosRouter);
app.use("/detallevuelo", detallesvuelosRouter);
app.use("/empleado", empleadosRouter)
app.use("/pasajero", pasajerosRouter)

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});