import * as habitacionesModel from '../models/habitacionesModel.js';

export const getHabitaciones = async (req, res) => {
    try {
        const habitaciones = await habitacionesModel.getAllHabitaciones();
        res.status(200).json(habitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHabitacion = async (req, res) => {
    try {
        const habitacion = await habitacionesModel.getHabitacionById(req.params.id);
        if (habitacion) {
            res.status(200).json(habitacion);
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNewHabitacion = async (req, res) => {
    try {
        const newHabitacion = await habitacionesModel.createHabitacion(req.body);
        res.status(201).json(newHabitacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateExistingHabitacion = async (req, res) => {
    try {
        const updated = await habitacionesModel.updateHabitacion(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Habitación actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'Habitación no encontrada para actualizar' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteExistingHabitacion = async (req, res) => {
    try {
        const deleted = await habitacionesModel.deleteHabitacion(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Habitación eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Habitación no encontrada para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};