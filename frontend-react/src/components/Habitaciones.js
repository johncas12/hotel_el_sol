import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definición de las URLs para mayor claridad
const API_URL = 'http://localhost:3000/api/habitaciones';
const TIPOS_URL = 'http://localhost:3000/api/tipos-habitacion';

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [tiposHabitacion, setTiposHabitacion] = useState([]); // Nuevo estado para el SELECT
    const [formData, setFormData] = useState({ // Usamos un solo estado para el formulario (Crear/Editar)
        numero_habitacion: '',
        id_tipo_habitacion: '', // Clave foránea
        estado: 'disponible'
    });
    const [editingId, setEditingId] = useState(null); // ID de la habitación que se está editando

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // 1. Obtener la lista de tipos de habitación (para el select)
        axios.get(TIPOS_URL)
            .then(res => setTiposHabitacion(res.data))
            .catch(err => console.error("Error al obtener tipos de habitación:", err));

        // 2. Obtener la lista de habitaciones (con el JOIN del nombre del tipo)
        axios.get(API_URL)
            .then(res => setHabitaciones(res.data))
            .catch(err => console.error("Error al obtener habitaciones:", err));
    };

    const handleChange = (e) => {
        // Si el campo es id_tipo_habitacion, aseguramos que se guarde como número para el backend
        const value = e.target.name === 'id_tipo_habitacion' ? parseInt(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Actualizar (PUT) usando los datos del formData
                await axios.put(`${API_URL}/${editingId}`, formData);
                alert('Habitación actualizada correctamente.');
            } else {
                // Crear (POST) usando los datos del formData
                await axios.post(API_URL, formData);
                alert('Habitación creada correctamente.');
            }
            
            // Limpiar formulario y reiniciar estado
            handleCancelEdit(); 
            fetchData(); // Recargar la lista
        } catch (error) {
            console.error('Error al guardar habitación:', error.response ? error.response.data : error.message);
            alert('Error al guardar la habitación. Revise la consola para detalles.');
        }
    };

    const handleEdit = (habitacion) => {
        // Carga los datos de la habitación en el formData
        setFormData({
            numero_habitacion: habitacion.numero_habitacion,
            id_tipo_habitacion: habitacion.id_tipo_habitacion,
            estado: habitacion.estado
        });
        setEditingId(habitacion.id_habitacion);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro de que desea eliminar esta habitación?')) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            alert('Habitación eliminada correctamente.');
            fetchData();
        } catch (error) {
            console.error('Error al eliminar habitación:', error);
            alert('Error al eliminar la habitación.');
        }
    };

    const handleCancelEdit = () => {
        setFormData({ numero_habitacion: '', id_tipo_habitacion: '', estado: 'disponible' });
        setEditingId(null);
    };

    return (
        <div className="container">
            <h2>Gestión de Habitaciones</h2>

            {/* Formulario de Agregar/Editar */}
            <div className="form-section">
                <h3>{editingId ? 'Editar Habitación' : 'Agregar Habitación'}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="numero_habitacion"
                        placeholder="Número de Habitación (Ej: 101)"
                        value={formData.numero_habitacion}
                        onChange={handleChange}
                        required
                    />
                    
                    {/* SELECT para el Tipo de Habitación (MEJORA UX) */}
                    <select
                        name="id_tipo_habitacion"
                        value={formData.id_tipo_habitacion}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Seleccione Tipo de Habitación</option>
                        {tiposHabitacion.map((tipo) => (
                            <option key={tipo.id_tipo_habitacion} value={tipo.id_tipo_habitacion}>
                                {tipo.nombre_tipo} (${tipo.precio_noche})
                            </option>
                        ))}
                    </select>

                    {/* SELECT para el Estado */}
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                    >
                        <option value="disponible">Disponible</option>
                        <option value="ocupada">Ocupada</option>
                        <option value="mantenimiento">Mantenimiento</option>
                    </select>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button type="submit">{editingId ? 'Actualizar' : 'Guardar'}</button>
                        {editingId && <button type="button" onClick={handleCancelEdit}>Cancelar Edición</button>}
                    </div>
                </form>
            </div>

            <hr />

            {/* Listado de Habitaciones */}
            <div className="list-section">
                <h3>Listado de Habitaciones</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Número</th>
                            <th>Tipo de Habitación</th> {/* Título de columna corregido */}
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitaciones.map((hab) => (
                            <tr key={hab.id_habitacion}>
                                <td>{hab.id_habitacion}</td>
                                <td>{hab.numero_habitacion}</td>
                                <td>{hab.nombre_tipo}</td> {/* Muestra el nombre, no el ID */}
                                <td>{hab.estado}</td>
                                <td>
                                    <button onClick={() => handleEdit(hab)} className="edit-button">Editar</button>
                                    <button onClick={() => handleDelete(hab.id_habitacion)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Habitaciones;