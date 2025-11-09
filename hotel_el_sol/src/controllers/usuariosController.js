import pool from "../config/database.js"; // Conexión a MySQL

/** 
 * Obtiene todos los usuarios 
 * GET /api/usuarios 
 */
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.status(200).json(rows); //devuelve el array
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      message: "Error interno del servidor al obtener usuarios.",
      error: error.message,
    });
  }
};

/** 
 * Obtiene un usuario por ID 
 * GET /api/usuarios/:id 
 */
export const getUsuario = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [req.params.id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(`Error al obtener el usuario ${req.params.id}:`, error);
    res.status(500).json({
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

/** 
 * Crea un nuevo usuario 
 * POST /api/usuarios 
 */
export const createUsuario = async (req, res) => {
  const { nombre, apellido, email, password_hash, telefono, tipousuario } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, tipousuario, fecharegistro) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [nombre, apellido, email, password_hash, telefono, tipousuario]
    );

    res.status(201).json({
      message: "Usuario creado exitosamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({
      message: "Error interno del servidor al crear usuario.",
      error: error.message,
    });
  }
};

/** 
 * Actualiza un usuario por ID 
 * PUT /api/usuarios/:id 
 */
export const updateUsuario = async (req, res) => {
  const { nombre, apellido, email, telefono, tipousuario } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, telefono = ?, tipousuario = ? WHERE id = ?",
      [nombre, apellido, email, telefono, tipousuario, req.params.id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario actualizado correctamente", id: req.params.id });
    } else {
      res.status(404).json({ message: "Usuario no encontrado para actualizar" });
    }
  } catch (error) {
    console.error(`Error al actualizar usuario ${req.params.id}:`, error);
    res.status(500).json({
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
};

/** 
 * Elimina un usuario por ID 
 * DELETE /api/usuarios/:id 
 */
export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [req.params.id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario eliminado correctamente", id: req.params.id });
    } else {
      res.status(404).json({ message: "Usuario no encontrado para eliminar" });
    }
  } catch (error) {
    console.error(`Error al eliminar usuario ${req.params.id}:`, error);
    res.status(500).json({
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
};