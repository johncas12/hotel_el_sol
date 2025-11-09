import * as reservasModel from '../models/reservasModel.js';

/**
 * Obtiene todas las reservas.
 * GET /api/reservas
 */
export const getAllReservas = async (req, res) => {
  try {
    const reservas = await reservasModel.getAllReservas();
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({
      message: 'Error al obtener reservas',
      error: error.message
    });
  }
};

/**
 * Obtiene una reserva por su ID.
 * GET /api/reservas/:id
 */
export const getReservaById = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await reservasModel.getReservaById(id);
    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    console.error(`Error al obtener la reserva ${id}:`, error);
    res.status(500).json({
      message: 'Error al obtener la reserva',
      error: error.message
    });
  }
};

/**
 * Crea una nueva reserva.
 * POST /api/reservas
 */
export const createReserva = async (req, res) => {
  try {
    const newReserva = await reservasModel.createReserva(req.body);
    res.status(201).json(newReserva);
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({
      message: 'Error al crear reserva',
      error: error.message
    });
  }
};

/**
 * Actualiza una reserva existente por ID.
 * PUT /api/reservas/:id
 */
export const updateReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await reservasModel.updateReserva(id, req.body);
    if (updated) {
      res.status(200).json({
        message: 'Reserva actualizada correctamente',
        id
      });
    } else {
      res.status(404).json({ message: 'Reserva no encontrada para actualizar' });
    }
  } catch (error) {
    console.error(`Error al actualizar reserva ${id}:`, error);
    res.status(500).json({
      message: 'Error al actualizar reserva',
      error: error.message
    });
  }
};

/**
 * Elimina una reserva por ID.
 * DELETE /api/reservas/:id
 */
export const deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await reservasModel.deleteReserva(id);
    if (deleted) {
      res.status(200).json({
        message: 'Reserva eliminada correctamente',
        id
      });
    } else {
      res.status(404).json({ message: 'Reserva no encontrada para eliminar' });
    }
  } catch (error) {
    console.error(`Error al eliminar reserva ${id}:`, error);
    res.status(500).json({
      message: 'Error al eliminar reserva',
      error: error.message
    });
  }
};