import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/servicios'; // URL de la API

const Servicios = () => {
    const [servicios, setServicios] = useState([]);
    const [formData, setFormData] = useState({
        nombre_servicio: '',
        descripcion: '',
        precio: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchServicios();
    }, []);

    const fetchServicios = async () => {
        try {
            const response = await axios.get(API_URL);
            setServicios(response.data);
        } catch (error) {
            console.error('Error al obtener los servicios:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convertir precio a número antes de enviar
        const dataToSend = { ...formData, precio: parseFloat(formData.precio) };

        try {
            if (editingId) {
                // Actualizar
                await axios.put(`${API_URL}/${editingId}`, dataToSend);
                alert('Servicio actualizado correctamente.');
            } else {
                // Crear
                await axios.post(API_URL, dataToSend);
                alert('Servicio creado correctamente.');
            }
            
            // Limpiar formulario y reiniciar estado de edición
            setFormData({ nombre_servicio: '', descripcion: '', precio: '' });
            setEditingId(null);
            fetchServicios(); // Recargar la lista
        } catch (error) {
            console.error('Error al guardar el servicio:', error.response ? error.response.data : error.message);
            alert('Error al guardar el servicio.');
        }
    };

    const handleEdit = (servicio) => {
        // Asegurar que el precio sea cargado como string para el input
        setFormData({
            ...servicio,
            precio: servicio.precio.toString() 
        });
        setEditingId(servicio.id_servicio);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este servicio?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert('Servicio eliminado correctamente.');
                fetchServicios();
            } catch (error) {
                console.error('Error al eliminar el servicio:', error);
                alert('Error al eliminar el servicio.');
            }
        }
    };

    const handleCancelEdit = () => {
        setFormData({ nombre_servicio: '', descripcion: '', precio: '' });
        setEditingId(null);
    };

    return (
        <div className="container">
            <h2>Gestión de Servicios</h2>

            {/* Formulario de Agregar/Editar */}
            <div className="form-section">
                <h3>{editingId ? 'Editar Servicio' : 'Agregar Servicio'}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre_servicio"
                        placeholder="Nombre del Servicio (Ej: Desayuno Buffet)"
                        value={formData.nombre_servicio}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="descripcion"
                        placeholder="Descripción del Servicio"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <input
                        type="number"
                        step="0.01" // Permite decimales
                        name="precio"
                        placeholder="Precio"
                        value={formData.precio}
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

            {/* Listado de Servicios */}
            <div className="list-section">
                <h3>Listado de Servicios</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map((s) => (
                            <tr key={s.id_servicio}>
                                <td>{s.id_servicio}</td>
                                <td>{s.nombre_servicio}</td>
                                <td>{s.descripcion}</td>
                                <td>${parseFloat(s.precio).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleEdit(s)} className="edit-button">Editar</button>
                                    <button onClick={() => handleDelete(s.id_servicio)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Servicios;