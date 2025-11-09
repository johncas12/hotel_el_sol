import React, { useState } from "react";
import UserForm from "./components/UserForm"; 
import UserList from "./components/UserList"; 
import Habitaciones from './components/Habitaciones'; 
import TiposHabitacion from './components/TiposHabitacion'; 
import Servicios from './components/Servicios'; 
import Reservas from './components/Reservas'; 

//  los archivos 'Servicios.js' y 'TiposHabitacion.js' creados en la carpeta components/

import './App.css'; // Importa tus estilos CSS

function App() {
    // Estado para controlar qué vista mostrar, 'usuarios' es la vista por defecto 
    const [currentView, setCurrentView] = useState('usuarios'); 
    
    // Estados específicos para el CRUD de Usuarios (manteniendo tu lógica original)
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshListToggle, setRefreshListToggle] = useState(false);

    /**
     * Función llamada por UserList cuando se hace clic en Editar.
     * Cambia la vista a 'usuarios' y carga los datos para edición.
     */
    const handleEditUser = (user) => {
        setCurrentView('usuarios'); 
        setSelectedUser(user);
    };

    /**
     * Función llamada cuando UserForm termina una operación.
     * Limpia el formulario y fuerza la recarga de la lista.
     */
    const handleSaveComplete = () => {
        setSelectedUser(null); // Limpia el formulario (modo "Crear")
        setRefreshListToggle(prev => !prev); // Alterna el estado para forzar la recarga de UserList
    };

    // Función principal para renderizar el componente según el estado actual
    const renderView = () => {
        switch (currentView) {
            case 'usuarios':
                return (
                    <div className="content-wrapper">
                        {/* Se mantiene la estructura original de Usuarios: Formulario arriba, Lista debajo */}
                        <h2 className="main-title">GESTIÓN DE USUARIOS HOTEL EL SOL</h2>
                        <UserForm
                            userToEdit={selectedUser}
                            onSaveComplete={handleSaveComplete}
                        />
                        <UserList
                            onUserEdit={handleEditUser} // Usa la función corregida
                            refreshListToggle={refreshListToggle} 
                        />
                    </div>
                );
            case 'tipos_habitacion':
                return <TiposHabitacion />;
                
            case 'habitaciones':
                return <Habitaciones />; 
                
            case 'servicios':
                return <Servicios />;

            case 'reservas':
                return <Reservas />;


                
            // Cuando aún no se ha seleccionado nada, puedes mostrar la vista de usuarios por defecto
            default:
                // Esto asegura que si currentView se rompe, mostramos usuarios.
                return renderView('usuarios'); 
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Hotel El Sol - Administración</h1>
                {/* Menú de Navegación */}
                <nav className="navbar">
                    {/* El botón 'Usuarios' restablece el estado para mostrar el formulario y la lista */}
                    <button onClick={() => setCurrentView('usuarios')} className={currentView === 'usuarios' ? 'active' : ''}>👤 Usuarios</button>
                    <button onClick={() => setCurrentView('tipos_habitacion')} className={currentView === 'tipos_habitacion' ? 'active' : ''}>🏠 Tipos Habitación</button>
                    <button onClick={() => setCurrentView('habitaciones')} className={currentView === 'habitaciones' ? 'active' : ''}>🛌 Habitaciones</button>
                    <button onClick={() => setCurrentView('servicios')} className={currentView === 'servicios' ? 'active' : ''}>🍽️ Servicios</button>
                    {/* Aquí se agregará el botón de Reservas en el siguiente paso */}
                </nav>
            </header>
            
            <main>
                {renderView()} {/* Renderiza la vista seleccionada */}
            </main>
        </div>
    );
}

export default App;