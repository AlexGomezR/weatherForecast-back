import express from "express"; //Para crear aplicación express
import dotenv from "dotenv"; //Cargar variables de entorno
import cors from "cors"; //Permitir solicitudes a dominios externos
import apiRouter from "./routes/api.js"; //Enrutador de /api
import { connectToDatabase } from "./db/db.js"; //Importar función para conexión a base de datos
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

// Función para utilizar path en ES Modules (exportamos para utilizarla globalmente)
export function currentDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return { __dirname, __filename };
}

const { __dirname } = currentDir();

const PORT = process.env.PORT;

//Creación de aplicación express
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Conexión a base de datos
connectToDatabase();

//Rutas
app.use("/api", apiRouter);
app.use("/getHours", apiRouter);

//Inicio del servidor y escuchando en el puerto de la variable de entorno
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
