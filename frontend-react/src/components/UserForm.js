import React, { useState, useEffect, useMemo } from 'react'; // 👈 1. Importar useMemo

// Se asume que la API de Express corre en el puerto 3000, 
// o el puerto configurado en el .env de tu backend
const API_URL = "http://localhost:3000/api/usuarios"; 

/**
 * Componente para crear o editar un usuario.
 * @param {object} props.userToEdit - Objeto del usuario a editar (null si es nuevo).
 * @param {function} props.onSaveComplete - Función para refrescar la lista después de guardar.
 */
const EmployeeForm = ({ userToEdit, onSaveComplete }) => {
    
    // 2. Usar useMemo para memorizar el estado inicial.
    // Esto garantiza que el objeto initialUserState sea el mismo en cada renderizado,
    // eliminando la advertencia de useEffect.
    const initialUserState = useMemo(() => ({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        tipousuario: '' // Debe ser 'cliente', 'admin', etc.
    }), []); // 3. Array de dependencias vacío, ya que es una constante

    const [userData, setUserData] = useState(initialUserState);

    // Efecto para cargar los datos del usuario cuando se recibe un objeto para editar
    useEffect(() => {
        if (userToEdit) {
            // Si hay un usuario para editar, llenamos el formulario
            setUserData({
                nombre: userToEdit.nombre || '',
                apellido: userToEdit.apellido || '',
                email: userToEdit.email || '',
                telefono: userToEdit.telefono || '',
                tipousuario: userToEdit.tipousuario || ''
            });
        } else {
            // Si no hay usuario, reseteamos el formulario
            setUserData(initialUserState);
        }
    // 4. Mantenemos userToEdit y initialUserState en las dependencias.
    // Como initialUserState ahora está memorizado, no causará re-ejecuciones innecesarias.
    }, [userToEdit, initialUserState]); 

    // Maneja el cambio en los campos del formulario
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    // Maneja el envío del formulario (Crear o Actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = userToEdit ? 'PUT' : 'POST';
        const url = userToEdit ? `${API_URL}/${userToEdit.id}` : API_URL;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                // Aseguramos que solo enviamos los campos que la BD espera
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Notificamos a App.js que la operación ha terminado
                onSaveComplete();
                // Limpiamos el formulario (solo si es POST)
                if (!userToEdit) {
                    setUserData(initialUserState);
                }
                const action = userToEdit ? "actualizado" : "creado";
                // Sustituimos alert() por un mensaje en consola, como indica la normativa
                console.log(`Usuario ${action} exitosamente.`);
            } else {
                const errorData = await response.json();
                console.error("Error en la operación de usuario:", errorData);
                // Sustituimos alert() por un mensaje en consola
                console.error(`Error al guardar usuario: ${errorData.message || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error("Error de conexión con el backend:", error);
            // Sustituimos alert() por un mensaje en consola
            console.error("Error de conexión con el servidor.");
        }
    };
    
    // Maneja la cancelación de la edición
    const handleCancel = () => {
        onSaveComplete(); // Esto fuerza a App.js a resetear selectedUser a null
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{userToEdit ? "Actualizar Usuario" : "Agregar Usuario"}</h2>
            
            {/* Campo: Nombre */}
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={userData.nombre}
                onChange={handleChange}
                required
            />
            
            {/* Campo: Apellido */}
            <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={userData.apellido}
                onChange={handleChange}
                required
            />
            
            {/* Campo: Email */}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                required
            />
            
            {/* Campo: Teléfono */}
            <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={userData.telefono}
                onChange={handleChange}
                required
            />

            {/* Campo: Tipo de Usuario (Usamos un select para asegurar valores válidos) */}
            <select
                name="tipousuario"
                value={userData.tipousuario}
                onChange={handleChange}
                required
                // Estilo para que el select se vea similar a los inputs
                style={{
                    width: 'calc(100% - 20px)', 
                    padding: '12px', 
                    marginBottom: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '1em',
                    boxSizing: 'border-box'
                }}
            >
                <option value="" disabled>Seleccione Tipo de Usuario</option>
                <option value="cliente">Cliente</option>
                <option value="admin">Administrador</option>
                <option value="moderador">Moderador</option>
            </select>


            {/* Botones de Acción */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    type="submit" 
                    // Estilos inline temporales para usar los colores del CSS
                    style={{ flex: 1, backgroundColor: userToEdit ? '#ffc107' : '#28a745', borderColor: userToEdit ? '#ffc107' : '#28a745', color: userToEdit ? '#212529' : '#fff', fontWeight: 'bold' }}
                >
                    {userToEdit ? "Actualizar" : "Guardar"}
                </button>
                
                {userToEdit && (
                    <button 
                        type="button" 
                        onClick={handleCancel}
                        // Estilos inline para el botón Cancelar/Limpiar
                        style={{ flex: 1, backgroundColor: '#17a2b8', borderColor: '#17a2b8' }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default EmployeeForm;
