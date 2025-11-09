import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Importación de las Rutas (Asegúrate de que estas rutas sean correctas)

import habitacionesRoutes from './routes/habitacionesRoutes.js'; 
import reservasRoutes from './routes/reservasRoutes.js'; 
import serviciosRoutes from './routes/serviciosRoutes.js';
import tiposHabitacionRoutes from './routes/tiposHabitacionRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

// Inicialización de Express
const app = express();
const port = 3000;

// Configuración de middlewares
app.use(cors()); // Habilita CORS para permitir conexiones desde el frontend de React
app.use(express.json()); // Habilita el uso de JSON en el cuerpo de las peticiones (req.body)

// Obtener el directorio actual para servir archivos estáticos (si fuera necesario)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Uso de las Rutas de la API
// Todas las rutas tendrán el prefijo /api
app.use('/api', habitacionesRoutes);
app.use('/api', reservasRoutes);
app.use('/api', serviciosRoutes); 
app.use('/api', tiposHabitacionRoutes);
app.use('/api', usuariosRoutes);

// Nota: Deberás importar y usar rutas para usuarios si planeas usarlas.

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});

// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});