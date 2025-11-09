import pool from '../config/database.js'; // Importación sin llaves {}

/**
 * Columnas de usuarios: id_usuario, nombre, apellido, email, telefono, fecha_registro
 */

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
    // Ordenamos por apellido y nombre
    const [rows] = await pool.query('SELECT * FROM usuarios ORDER BY apellido, nombre');
    return rows;
};

// Obtener un usuario por ID
export const getUsuarioById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return rows[0];
};

// Crear un nuevo usuario
export const createUsuario = async (usuario) => {
    const { nombre, apellido, email, telefono } = usuario;
    
    // Usamos el momento actual como fecha de registro por defecto
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, apellido, email, telefono, fecha_registro) VALUES (?, ?, ?, ?, NOW())',
        [nombre, apellido, email, telefono]
    );
    // Retorna el objeto completo con el ID generado y la fecha de registro actual
    return { id_usuario: result.insertId, fecha_registro: new Date().toISOString().split('T')[0], ...usuario };
};

// Actualizar un usuario existente
export const updateUsuario = async (id, usuario) => {
    const { nombre, apellido, email, telefono } = usuario;
    
    const [result] = await pool.query(
        `UPDATE usuarios SET 
            nombre = ?, apellido = ?, email = ?, telefono = ?
         WHERE id_usuario = ?`,
        [nombre, apellido, email, telefono, id]
    );
    return result.affectedRows > 0;
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return result.affectedRows > 0;
};