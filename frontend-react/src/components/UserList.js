import React, { useEffect, useState } from "react";

function UserList({ onUserEdit, refreshListToggle }) {
    // Estado para almacenar la lista de usuarios
    const [users, setUsers] = useState([]);
    // Estado para gestionar el estado de carga
    const [loading, setLoading] = useState(true);
    // URI base de la API
    const API_BASE_URL = "http://localhost:3000/api/usuarios";

    // Función para obtener la lista de usuarios del backend
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Petición GET a la API de usuarios
            const res = await fetch(API_BASE_URL); 
            if (!res.ok) {
                throw new Error('Error al obtener la lista de usuarios del servidor.');
            }
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Error al cargar usuarios:", err);
            // Podrías mostrar un mensaje de error en la UI si la carga falla
        } finally {
            setLoading(false);
        }
    };

    // Efecto que recarga la lista al montar o cuando se dispara el toggle desde App.js (tras una acción de guardar/eliminar)
    useEffect(() => {
        fetchUsers();
    }, [refreshListToggle]); 

    // Función para eliminar un usuario
    const handleDelete = async (id, nombre) => {
        // Usamos window.confirm para una confirmación simple
        // NOTA: En el entorno de canvas, se recomienda evitar window.confirm/alert.
        // Si estás ejecutándolo localmente, está bien.
        if (!window.confirm(`¿Estás seguro de que quieres eliminar al usuario ${nombre} (ID: ${id})? Esta acción es irreversible.`)) return;

        try {
            // Petición DELETE a la API de usuarios
            const res = await fetch(`${API_BASE_URL}/${id}`, {
                method: "DELETE",
            });
            
            if (res.ok) {
                console.log(`Usuario ${nombre} eliminado.`);
                fetchUsers(); // Recarga la lista
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Fallo al eliminar el usuario.');
            }
        } catch (err) {
            console.error("Error al eliminar:", err.message);
        }
    };

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    return (
        <div className="user-list-container">
            <h2>Listado de Usuarios del Hotel</h2>
            
            {users.length === 0 ? (
                <p>No hay usuarios registrados en el sistema.</p>
            ) : (
                // La tabla ahora utiliza la clase 'data-table'
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Tipo de Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}> 
                                <td>{user.id}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.email}</td>
                                <td>{user.telefono}</td>
                                <td>{user.tipousuario}</td> 
                                {/* 3. La celda de acciones usa la clase 'actions-cell' */}
                                <td className="actions-cell">
                                    {/* 4. Botón Editar usa la clase 'btn-secondary' (azul/cyan) */}
                                    <button 
                                        onClick={() => onUserEdit(user)} 
                                        className="btn-secondary"
                                    >
                                        Editar
                                    </button>

                                    {/* 5. Botón Eliminar usa la clase 'btn-danger' (rojo) */}
                                    <button
                                        onClick={() => handleDelete(user.id, user.nombre)}
                                        className="btn-danger"
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserList;