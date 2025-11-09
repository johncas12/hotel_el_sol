import * as serviciosModel from '../models/serviciosModel.js';

/**
 * Obtiene todos los servicios disponibles.
 * GET /api/servicios
 */
export const getServicios = async (req, res) => {
    try {
        // Llama a la función del modelo para obtener todos los servicios
        const servicios = await serviciosModel.getAllServicios();
        res.status(200).json(servicios);
    } catch (error) {
        // Manejo de errores y respuesta 500
        console.error("Error al obtener servicios:", error);
        res.status(500).json({ message: 'Error al obtener servicios', error: error.message });
    }
};

/**
 * Obtiene un servicio por su ID.
 * GET /api/servicios/:id
 */
export const getServicio = async (req, res) => {
    try {
        // Llama a la función del modelo para obtener un servicio por ID
        const servicio = await serviciosModel.getServicioById(req.params.id);
        if (servicio) {
            res.status(200).json(servicio);
        } else {
            // Respuesta 404 si el servicio no existe
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el servicio ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al obtener el servicio', error: error.message });
    }
};

/**
 * Crea un nuevo servicio.
 * POST /api/servicios
 */
export const createNewServicio = async (req, res) => {
    try {
        // Llama a la función del modelo para crear el servicio
        const newServicio = await serviciosModel.createServicio(req.body);
        // Retornamos el objeto recién creado, incluyendo el ID de la BD, con status 201 (Created)
        res.status(201).json(newServicio); 
    } catch (error) {
        console.error("Error al crear servicio:", error);
        res.status(500).json({ message: 'Error al crear servicio', error: error.message });
    }
};

/**
 * Actualiza un servicio existente por ID.
 * PUT /api/servicios/:id
 */
export const updateExistingServicio = async (req, res) => {
    try {
        // Llama a la función del modelo para actualizar el servicio
        const updated = await serviciosModel.updateServicio(req.params.id, req.body);
        if (updated) {
            // Respuesta 200 si la actualización fue exitosa
            res.status(200).json({ message: 'Servicio actualizado correctamente', id: req.params.id });
        } else {
            // Respuesta 404 si el servicio no fue encontrado
            res.status(404).json({ message: 'Servicio no encontrado para actualizar' });
        }
    } catch (error) {
        console.error(`Error al actualizar servicio ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al actualizar servicio', error: error.message });
    }
};

/**
 * Elimina un servicio por ID.
 * DELETE /api/servicios/:id
 */
export const deleteExistingServicio = async (req, res) => {
    try {
        // Llama a la función del modelo para eliminar el servicio
        const deleted = await serviciosModel.deleteServicio(req.params.id);
        if (deleted) {
            // Respuesta 200 si la eliminación fue exitosa
            res.status(200).json({ message: 'Servicio eliminado correctamente', id: req.params.id });
        } else {
            // Respuesta 404 si el servicio no fue encontrado
            res.status(404).json({ message: 'Servicio no encontrado para eliminar' });
        }
    } catch (error) {
        console.error(`Error al eliminar servicio ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al eliminar servicio', error: error.message });
    }
};