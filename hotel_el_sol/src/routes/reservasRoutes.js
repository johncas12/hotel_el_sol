import { Router } from 'express';
import {
  getAllReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
} from '../controllers/reservasController.js';

const router = Router();

router.get('/reservas', getAllReservas);
router.get('/reservas/:id', getReservaById);
router.post('/reservas', createReserva);
router.put('/reservas/:id', updateReserva);
router.delete('/reservas/:id', deleteReserva);

export default router;