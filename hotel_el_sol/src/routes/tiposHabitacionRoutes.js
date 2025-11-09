import { Router } from 'express';
import {
    getTiposHabitacion,
    getTipoHabitacion,
    createNewTipoHabitacion,
    updateExistingTipoHabitacion,
    deleteExistingTipoHabitacion
} from '../controllers/tiposHabitacionController.js';

const router = Router();

// Rutas para /api/tipos-habitacion
router.get('/tipos-habitacion', getTiposHabitacion);
router.get('/tipos-habitacion/:id', getTipoHabitacion);
router.post('/tipos-habitacion', createNewTipoHabitacion);
router.put('/tipos-habitacion/:id', updateExistingTipoHabitacion);
router.delete('/tipos-habitacion/:id', deleteExistingTipoHabitacion);

export default router;