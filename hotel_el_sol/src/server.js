import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // 1. Importar el paquete CORS
import usuariosRoutes from "./routes/usuarios.js";

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(express.json()); // Necesario para leer datos JSON en el cuerpo de las peticiones (POST/PUT)

// 2. Middleware CORS
// Esto permite que el frontend (ej. localhost:5173) pueda hacer peticiones
// al backend (localhost:3000) sin ser bloqueado por la política del navegador.
// Puedes configurar opciones más específicas si es necesario, pero este es el valor por defecto.
app.use(cors());

// RUTAS
// Asigna el prefijo '/api/usuarios' a todas las rutas definidas en usuariosRoutes
app.use('/api/usuarios', usuariosRoutes); 

app.listen(process.env.PORT, () => {
    // 3. Pequeña validación de puerto por si .env no lo define
    const port = process.env.PORT || 3000;
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
