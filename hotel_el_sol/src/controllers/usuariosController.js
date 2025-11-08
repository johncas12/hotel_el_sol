import pool from "../config/database.js"; // Importa tu pool de conexiones

// Controlador para obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        // Ejecuta la consulta a la base de datos
        // pool.query() retorna una promesa gracias a mysql2/promise
        const [rows] = await pool.query("SELECT * FROM usuarios"); 
        
        // El resultado 'rows' contiene la lista de usuarios.
        // Se envía como respuesta JSON.
        res.status(200).json(rows);

    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        // Si hay un error, se envía una respuesta de error 500
        res.status(500).json({ 
            message: "Error interno del servidor al obtener usuarios.",
            error: error.message 
        });
    }
};

// Puedes añadir más controladores aquí, como createUsuario, updateUsuario, etc.

// Ejemplo de otro controlador (no necesario para este ejemplo, pero útil)
export const createUsuario = async (req, res) => {
    const { nombre, apellido, email, password_hash, telefono, tipousuario } = req.body;
    
    // NOTA: 'id' y 'fecharegistro' se manejan automáticamente o con funciones SQL como NOW()

    try {
        const [result] = await pool.query(
            "INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, tipousuario, fecharegistro) VALUES (?, ?, ?, ?, ?, ?, NOW())",
            [nombre, apellido, email, password_hash, telefono, tipousuario]
        );

        res.status(201).json({ 
            message: "Usuario creado exitosamente", 
            id: result.insertId 
        });

    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ 
            message: "Error interno del servidor al crear usuario.",
            error: error.message 
        });
    }
};