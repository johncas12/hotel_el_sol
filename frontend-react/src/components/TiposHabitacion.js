import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tipos-habitacion';

const TiposHabitacion = () => {
    const [tipos, setTipos] = useState([]);
    const [formData, setFormData] = useState({
        nombre_tipo: '',
        descripcion: '',
        capacidad_maxima: 1,
        precio_noche: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTipos();
    }, []);

    const fetchTipos = async () => {
        try {
            const response = await axios.get(API_URL);
            setTipos(response.data);
        } catch (error) {
            console.error('Error al obtener los tipos de habitación:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convertir capacidad y precio a números
        const dataToSend = {
            ...formData,
            capacidad_maxima: parseInt(formData.capacidad_maxima),
            precio_noche: parseFloat(formData.precio_noche)
        };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, dataToSend);
                alert('Tipo de habitación actualizado correctamente.');
            } else {
                await axios.post(API_URL, dataToSend);
                alert('Tipo de habitación creado correctamente.');
            }
            
            // Limpiar formulario y reiniciar estado
            setFormData({ nombre_tipo: '', descripcion: '', capacidad_maxima: 1, precio_noche: '' });
            setEditingId(null);
            fetchTipos(); // Recargar la lista
        } catch (error) {
            console.error('Error al guardar tipo de habitación:', error.response ? error.response.data : error.message);
            alert('Error al guardar el tipo de habitación.');
        }
    };

    const handleEdit = (tipo) => {
        // Asegurar que el precio sea cargado como string para el input
        setFormData({
            ...tipo,
            precio_noche: tipo.precio_noche.toString()
        });
        setEditingId(tipo.id_tipo_habitacion);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este tipo de habitación?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert('Tipo de habitación eliminado correctamente.');
                fetchTipos();
            } catch (error) {
                console.error('Error al eliminar tipo de habitación:', error);
                alert('Error al eliminar el tipo de habitación. Asegúrate de que no haya habitaciones asociadas.');
            }
        }
    };

    const handleCancelEdit = () => {
        setFormData({ nombre_tipo: '', descripcion: '', capacidad_maxima: 1, precio_noche: '' });
        setEditingId(null);
    };

    return (
        <div className="container">
            <h2>Gestión de Tipos de Habitación</h2>

            {/* Formulario de Agregar/Editar */}
            <div className="form-section">
                <h3>{editingId ? 'Editar Tipo' : 'Agregar Tipo'}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre_tipo"
                        placeholder="Nombre del Tipo (Ej: Suite Presidencial)"
                        value={formData.nombre_tipo}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="descripcion"
                        placeholder="Descripción y características"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <input
                        type="number"
                        name="capacidad_maxima"
                        placeholder="Capacidad Máxima"
                        value={formData.capacidad_maxima}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        name="precio_noche"
                        placeholder="Precio por Noche"
                        value={formData.precio_noche}
                        onChange={handleChange}
                        required
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit">{editingId ? 'Actualizar' : 'Guardar'}</button>
                        {editingId && <button type="button" onClick={handleCancelEdit}>Cancelar</button>}
                    </div>
                </form>
            </div>

            <hr />

            {/* Listado de Tipos */}
            <div className="list-section">
                <h3>Listado de Tipos de Habitación</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Capacidad</th>
                            <th>Precio/Noche</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipos.map((tipo) => (
                            <tr key={tipo.id_tipo_habitacion}>
                                <td>{tipo.id_tipo_habitacion}</td>
                                <td>{tipo.nombre_tipo}</td>
                                <td>{tipo.capacidad_maxima}</td>
                                <td>${parseFloat(tipo.precio_noche).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleEdit(tipo)} className="edit-button">Editar</button>
                                    <button onClick={() => handleDelete(tipo.id_tipo_habitacion)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TiposHabitacion;