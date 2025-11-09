import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import './App.css'; // Importa los estilos CSS que has definido

function App() {
    // Estado para el usuario que se está editando. Si es null, el formulario está en modo "Crear".
    const [selectedUser, setSelectedUser] = useState(null);
    
    // Estado para forzar el refresco de la lista. Se alterna tras una operación POST/PUT/DELETE.
    const [refreshListToggle, setRefreshListToggle] = useState(false);

    /**
     * Función llamada cuando el usuario hace clic en "Editar" en UserList.
     * @param {object} user - El objeto usuario a editar.
     */
    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    /**
     * Función llamada cuando UserForm termina una operación (guardar o actualizar).
     * Esto limpia el formulario y fuerza la recarga de la lista.
     */
    const handleSaveComplete = () => {
        setSelectedUser(null); // Limpia el formulario (modo "Crear")
        setRefreshListToggle(prev => !prev); // Alterna el estado para forzar el refresco en UserList
    };

    return (
        <div className="app-container">
            <h1 className="main-title">GESTIÓN DE USUARIOS HOTEL EL SOL</h1>

            <div className="content-wrapper">
                {/* 1. Formulario de Creación/Edición */}
                <div className="form-section">
                    <UserForm
                        userToEdit={selectedUser}
                        onSaveComplete={handleSaveComplete}
                    />
                </div>

                {/* 2. Listado de Usuarios */}
                <div className="list-section">
                    <UserList
                        onUserEdit={handleEdit} // Pasa la función para iniciar la edición
                        refreshListToggle={refreshListToggle} // Pasa el toggle para refrescar
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
