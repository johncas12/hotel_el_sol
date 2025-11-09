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
router.get('/', getUsuarios); // GET /api/usuarios
router.get('/:id', getUsuario); // GET /api/usuarios/:id
router.post('/', createUsuario); // POST /api/usuarios
router.put('/:id', updateUsuario); // PUT /api/usuarios/:id
router.delete('/:id', deleteUsuario); // DELETE /api/usuarios/:id


export default router;