import * as usuariosModel from '../models/usuariosModel.js';

/**
 * Obtiene todos los usuarios.
 * GET /api/usuarios
 */
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

/**
 * Obtiene un usuario por su ID.
 * GET /api/usuarios/:id
 */
export const getUsuario = async (req, res) => {
    try {
        const usuario = await usuariosModel.getUsuarioById(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(`Error al obtener el usuario ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
};

/**
 * Crea un nuevo usuario.
 * POST /api/usuarios
 */
export const createUsuario = async (req, res) => {
    try {
        const newUsuario = await usuariosModel.createUsuario(req.body);
        res.status(201).json(newUsuario); 
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

/**
 * Actualiza un usuario existente por ID.
 * PUT /api/usuarios/:id
 */
export const updateUsuario = async (req, res) => {
    try {
        const updated = await usuariosModel.updateUsuario(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Usuario actualizado correctamente', id: req.params.id });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado para actualizar' });
        }
    } catch (error) {
        console.error(`Error al actualizar usuario ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

/**
 * Elimina un usuario por ID.
 * DELETE /api/usuarios/:id
 */
export const deleteUsuario = async (req, res) => {
    try {
        const deleted = await usuariosModel.deleteUsuario(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Usuario eliminado correctamente', id: req.params.id });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
        }
    } catch (error) {
        console.error(`Error al eliminar usuario ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};