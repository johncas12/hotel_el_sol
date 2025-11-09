import pool from '../config/database.js'; // Asegura la importación correcta sin llaves {}

/**
 * Columnas de tipos_habitacion: id_tipo_habitacion, nombre, descripcion, capacidad_maxima, precio_noche, caracteristicas
 */

// Obtener todos los tipos de habitación
export const getAllTiposHabitacion = async () => {
    // Agregamos ORDER BY para mantener un orden
    const [rows] = await pool.query('SELECT * FROM tipos_habitacion ORDER BY nombre');
    return rows;
};

// Obtener un tipo de habitación por ID
export const getTipoHabitacionById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM tipos_habitacion WHERE id_tipo_habitacion = ?', [id]);
    return rows[0];
};

// Crear un nuevo tipo de habitación
export const createTipoHabitacion = async (tipo) => {
    // Usamos 'nombre' (coherencia con Habitaciones), y añadimos 'caracteristicas' y 'precio_noche'
    const { nombre, descripcion, capacidad_maxima, precio_noche, caracteristicas } = tipo;
    const [result] = await pool.query(
        'INSERT INTO tipos_habitacion (nombre, descripcion, capacidad_maxima, precio_noche, caracteristicas) VALUES (?, ?, ?, ?, ?)',
        [nombre, descripcion, capacidad_maxima, precio_noche, caracteristicas]
    );
    return { id_tipo_habitacion: result.insertId, ...tipo };
};

// Actualizar un tipo de habitación existente
export const updateTipoHabitacion = async (id, tipo) => {
    const { nombre, descripcion, capacidad_maxima, precio_noche, caracteristicas } = tipo;
    const [result] = await pool.query(
        `UPDATE tipos_habitacion SET 
            nombre = ?, descripcion = ?, capacidad_maxima = ?, precio_noche = ?, caracteristicas = ? 
         WHERE id_tipo_habitacion = ?`,
        [nombre, descripcion, capacidad_maxima, precio_noche, caracteristicas, id]
    );
    return result.affectedRows > 0;
};

// Eliminar un tipo de habitación
export const deleteTipoHabitacion = async (id) => {
    const [result] = await pool.query('DELETE FROM tipos_habitacion WHERE id_tipo_habitacion = ?', [id]);
    return result.affectedRows > 0;
};