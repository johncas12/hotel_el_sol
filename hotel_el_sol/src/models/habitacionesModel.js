import pool from '../config/database.js'; // Importación correcta sin llaves {}

/**
 * Columnas de habitaciones: id_habitacion, numero_habitacion, id_tipo_habitacion, estado
 */

// Obtener todas las habitaciones, incluyendo el nombre del tipo de habitación (JOIN)
export const getAllHabitaciones = async () => {
    const query = `
        SELECT 
            h.id_habitacion, 
            h.numero_habitacion, 
            h.estado, 
            t.id_tipo_habitacion,
            t.nombre_tipo  // <-- Incluimos el nombre del tipo para el frontend
        FROM habitaciones h
        JOIN tipos_habitacion t ON h.id_tipo_habitacion = t.id_tipo_habitacion
        ORDER BY h.numero_habitacion
    `;
    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Error en getAllHabitaciones:", error);
        throw error;
    }
};

// Obtener una habitación por ID (solo datos de habitaciones)
export const getHabitacionById = async (id) => {
    const query = 'SELECT * FROM habitaciones WHERE id_habitacion = ?';
    try {
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error("Error en getHabitacionById:", error);
        throw error;
    }
};

// Crear una nueva habitación
export const createHabitacion = async (habitacion) => {
    const { numero_habitacion, id_tipo_habitacion, estado } = habitacion;
    const [result] = await pool.query(
        'INSERT INTO habitaciones (numero_habitacion, id_tipo_habitacion, estado) VALUES (?, ?, ?)',
        [numero_habitacion, id_tipo_habitacion, estado]
    );
    return { id_habitacion: result.insertId, ...habitacion };
};

// Actualizar una habitación existente
export const updateHabitacion = async (id, habitacion) => {
    const { numero_habitacion, id_tipo_habitacion, estado } = habitacion;
    const [result] = await pool.query(
        'UPDATE habitaciones SET numero_habitacion = ?, id_tipo_habitacion = ?, estado = ? WHERE id_habitacion = ?',
        [numero_habitacion, id_tipo_habitacion, estado, id]
    );
    return result.affectedRows > 0;
};

// Eliminar una habitación
export const deleteHabitacion = async (id) => {
    const [result] = await pool.query('DELETE FROM habitaciones WHERE id_habitacion = ?', [id]);
    return result.affectedRows > 0;
};