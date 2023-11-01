import express from "express";
import cors from "cors";
import { paisesRouter } from "./paises.js";
import { avionRouter } from "./avion.js";
import {boletoRouter} from "./boleto.js"
import { vueloRouter } from "./vuelo.js";
import { detallevueloRouter } from "./detalle.js";
import { pasajeroRouter } from "./pasajero.js";


// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());
app.use("/paises", paisesRouter);
app.use("/avion",avionRouter);
app.use("/boleto", boletoRouter);
app.use("/vuelo", vueloRouter);
app.use("/detallevuelo", detallevueloRouter);
app.use("/pasajero", pasajeroRouter);

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});