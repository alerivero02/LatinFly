
import mysql from "mysql2/promise";

// Conectar a base de datos
export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "aerolinea",
  namedPlaceholders: true,
}); 

console.log("Conectado a base de datos");