import * as tiposHabitacionModel from '../models/tiposHabitacionModel.js';

export const getTiposHabitacion = async (req, res) => {
    try {
        const tipos = await tiposHabitacionModel.getAllTiposHabitacion();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tipos de habitación', error: error.message });
    }
};

export const getTipoHabitacion = async (req, res) => {
    try {
        const tipo = await tiposHabitacionModel.getTipoHabitacionById(req.params.id);
        if (tipo) {
            res.status(200).json(tipo);
        } else {
            res.status(404).json({ message: 'Tipo de habitación no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el tipo de habitación', error: error.message });
    }
};

export const createNewTipoHabitacion = async (req, res) => {
    try {
        const newTipo = await tiposHabitacionModel.createTipoHabitacion(req.body);
        res.status(201).json(newTipo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tipo de habitación', error: error.message });
    }
};

export const updateExistingTipoHabitacion = async (req, res) => {
    try {
        const updated = await tiposHabitacionModel.updateTipoHabitacion(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Tipo de habitación actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Tipo de habitación no encontrado para actualizar' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tipo de habitación', error: error.message });
    }
};

export const deleteExistingTipoHabitacion = async (req, res) => {
    try {
        const deleted = await tiposHabitacionModel.deleteTipoHabitacion(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Tipo de habitación eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Tipo de habitación no encontrado para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tipo de habitación', error: error.message });
    }
};