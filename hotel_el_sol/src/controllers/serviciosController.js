import * as serviciosModel from '../models/serviciosModel.js';

/**
 * Obtiene todos los servicios disponibles.
 * GET /api/servicios
 */
export const getServicios = async (req, res) => {
    try {
        const servicios = await serviciosModel.getAllServicios();
        res.status(200).json(servicios);
    } catch (error) {
        // Mejoramos la respuesta de error para incluir el mensaje específico de la BD si es relevante
        res.status(500).json({ message: 'Error al obtener servicios', error: error.message });
    }
};

/**
 * Obtiene un servicio por su ID.
 * GET /api/servicios/:id
 */
export const getServicio = async (req, res) => {
    try {
        const servicio = await serviciosModel.getServicioById(req.params.id);
        if (servicio) {
            res.status(200).json(servicio);
        } else {
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el servicio', error: error.message });
    }
};

/**
 * Crea un nuevo servicio.
 * POST /api/servicios
 */
export const createNewServicio = async (req, res) => {
    try {
        const newServicio = await serviciosModel.createServicio(req.body);
        // Retornamos el objeto recién creado, incluyendo el ID de la BD
        res.status(201).json(newServicio); 
    } catch (error) {
        res.status(500).json({ message: 'Error al crear servicio', error: error.message });
    }
};

/**
 * Actualiza un servicio existente por ID.
 * PUT /api/servicios/:id
 */
export const updateExistingServicio = async (req, res) => {
    try {
        const updated = await serviciosModel.updateServicio(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Servicio actualizado correctamente', id: req.params.id });
        } else {
            res.status(404).json({ message: 'Servicio no encontrado para actualizar' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar servicio', error: error.message });
    }
};

/**
 * Elimina un servicio por ID.
 * DELETE /api/servicios/:id
 */
export const deleteExistingServicio = async (req, res) => {
    try {
        const deleted = await serviciosModel.deleteServicio(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Servicio eliminado correctamente', id: req.params.id });
        } else {
            res.status(404).json({ message: 'Servicio no encontrado para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar servicio', error: error.message });
    }
};