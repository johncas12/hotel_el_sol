import pool from '../config/database.js'; // Importación sin llaves {}

/**
 * Columnas de reservas: id_reserva, id_habitacion, id_usuario, fecha_inicio, fecha_fin, precio_total, estado
 * El estado puede ser 'Pendiente', 'Confirmada', 'Cancelada', 'Completada'.
 */

// Obtener todas las reservas (con JOIN para mostrar detalles relevantes)
export const getAllReservas = async () => {
    // Se recomienda ordenar por fecha de inicio para mejor visualización
    const [rows] = await pool.query(`
        SELECT 
            r.*,
            h.numero AS numero_habitacion,
            u.nombre AS nombre_usuario,
            u.apellido AS apellido_usuario
        FROM 
            reservas r
        JOIN 
            habitaciones h ON r.id_habitacion = h.id_habitacion
        JOIN 
            usuarios u ON r.id_usuario = u.id_usuario
        ORDER BY 
            r.fecha_inicio DESC
    `);
    return rows;
};

// Obtener una reserva por ID
export const getReservaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM reservas WHERE id_reserva = ?', [id]);
    return rows[0];
};

// Crear una nueva reserva
export const createReserva = async (reserva) => {
    const { id_habitacion, id_usuario, fecha_inicio, fecha_fin, precio_total, estado } = reserva;
    const [result] = await pool.query(
        'INSERT INTO reservas (id_habitacion, id_usuario, fecha_inicio, fecha_fin, precio_total, estado) VALUES (?, ?, ?, ?, ?, ?)',
        [id_habitacion, id_usuario, fecha_inicio, fecha_fin, precio_total, estado]
    );
    return { id_reserva: result.insertId, ...reserva };
};

// Actualizar una reserva existente
export const updateReserva = async (id, reserva) => {
    const { id_habitacion, id_usuario, fecha_inicio, fecha_fin, precio_total, estado } = reserva;
    const [result] = await pool.query(
        `UPDATE reservas SET 
            id_habitacion = ?, 
            id_usuario = ?, 
            fecha_inicio = ?, 
            fecha_fin = ?, 
            precio_total = ?, 
            estado = ? 
         WHERE id_reserva = ?`,
        [id_habitacion, id_usuario, fecha_inicio, fecha_fin, precio_total, estado, id]
    );
    return result.affectedRows > 0;
};

// Eliminar una reserva
export const deleteReserva = async (id) => {
    const [result] = await pool.query('DELETE FROM reservas WHERE id_reserva = ?', [id]);
    return result.affectedRows > 0;
};