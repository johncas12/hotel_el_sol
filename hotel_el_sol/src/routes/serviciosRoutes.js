import { Router } from 'express';
import {
    getServicios,
    getServicio,
    createNewServicio,
    updateExistingServicio,
    deleteExistingServicio
} from '../controllers/serviciosController.js';

const router = Router();

router.get('/servicios', getServicios);
router.get('/servicios/:id', getServicio);
router.post('/servicios', createNewServicio);
router.put('/servicios/:id', updateExistingServicio);
router.delete('/servicios/:id', deleteExistingServicio);

export default router;