//Se realizan las importaciones

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

//Se denomina la ruta para usar en el Thunder
app.use("/auth", authRouter);
app.use("/paises", paisesRouter);
app.use("/aviones",avionesRouter);
app.use("/boletos", boletosRouter);
app.use("/vuelos", vuelosRouter);
app.use("/detallesvuelos", detallesvuelosRouter);
app.use("/empleados", empleadosRouter)
app.use("/pasajeros", pasajerosRouter)

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});