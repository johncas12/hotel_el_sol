import { Router } from 'express';
import {
    getHabitaciones,
    getHabitacion,
    createNewHabitacion,
    updateExistingHabitacion,
    deleteExistingHabitacion
} from '../controllers/habitacionesController.js';

const router = Router();

router.get('/habitaciones', getHabitaciones);
router.get('/habitaciones/:id', getHabitacion);
router.post('/habitaciones', createNewHabitacion);
router.put('/habitaciones/:id', updateExistingHabitacion);
router.delete('/habitaciones/:id', deleteExistingHabitacion);

export default router;