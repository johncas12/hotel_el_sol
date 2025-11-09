// Importaciones principales
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Cargar variables de entorno desde .env
dotenv.config();

// Inicialización de Express
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors()); // Permite peticiones desde el frontend (ej. localhost:5173)
app.use(express.json()); // Permite leer datos JSON en el cuerpo de las peticiones (POST/PUT)

// Obtener el directorio actual (útil si querés servir archivos estáticos)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importación de rutas
import habitacionesRoutes from './routes/habitacionesRoutes.js'; 
import reservasRoutes from './routes/reservasRoutes.js'; 
import serviciosRoutes from './routes/serviciosRoutes.js';
import tiposHabitacionRoutes from './routes/tiposHabitacionRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

// RUTAS
// Todas las rutas tendrán el prefijo /api
app.use('/api/habitaciones', habitacionesRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/tipos-habitacion', tiposHabitacionRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(` Servidor corriendo en http://localhost:${port}`);
});