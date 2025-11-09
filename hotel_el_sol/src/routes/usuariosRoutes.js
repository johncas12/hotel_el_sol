import { Router } from 'express';
import { 
    getUsuarios, 
    getUsuario, 
    createUsuario, 
    updateUsuario, 
    deleteUsuario 
} from '../controllers/usuariosController.js'; // Asegúrate que esta ruta sea correcta

const router = Router();

// Rutas CRUD para /api/usuarios
router.get('/usuarios', getUsuarios); // Obtener todos los usuarios
router.get('/usuarios/:id', getUsuario); // Obtener un usuario por ID
router.post('/usuarios', createUsuario); // Crear un nuevo usuario
router.put('/usuarios/:id', updateUsuario); // Actualizar un usuario por ID
router.delete('/usuarios/:id', deleteUsuario); // Eliminar un usuario por ID

export default router;