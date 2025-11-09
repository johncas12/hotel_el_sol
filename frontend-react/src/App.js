import React, { useState } from "react";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Habitaciones from './components/Habitaciones';
import TiposHabitacion from './components/TiposHabitacion';
import Servicios from './components/Servicios';
import Reservas from './components/Reservas';

import './App.css'; // Estilos CSS

function App() {
  // Estado para controlar la vista actual
  const [currentView, setCurrentView] = useState('usuarios');

  // Estado para edición de usuario
  const [selectedUser, setSelectedUser] = useState(null);

  // Estado para refrescar la lista
  const [refreshListToggle, setRefreshListToggle] = useState(false);

  // Función para iniciar edición
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setCurrentView('usuarios');
  };

  // Función para limpiar formulario y refrescar lista
  const handleSaveComplete = () => {
    setSelectedUser(null);
    setRefreshListToggle(prev => !prev);
  };

  // Renderiza la vista seleccionada
  const renderView = () => {
    switch (currentView) {
      case 'usuarios':
        return (
          <div className="content-wrapper">
            <h2 className="main-title">GESTIÓN DE USUARIOS HOTEL EL SOL</h2>
            <UserForm
              userToEdit={selectedUser}
              onSaveComplete={handleSaveComplete}
            />
            <UserList
              onUserEdit={handleEditUser}
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
      default:
         return <div>Vista no reconocida</div>;

              
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Hotel El Sol - Administración</h1>
        <nav className="navbar">
          <button onClick={() => setCurrentView('usuarios')} className={currentView === 'usuarios' ? 'active' : ''}>👤 Usuarios</button>
          <button onClick={() => setCurrentView('tipos_habitacion')} className={currentView === 'tipos_habitacion' ? 'active' : ''}>🏠 Tipos Habitación</button>
          <button onClick={() => setCurrentView('habitaciones')} className={currentView === 'habitaciones' ? 'active' : ''}>🛌 Habitaciones</button>
          <button onClick={() => setCurrentView('servicios')} className={currentView === 'servicios' ? 'active' : ''}>🍽️ Servicios</button>
          <button onClick={() => setCurrentView('reservas')} className={currentView === 'reservas' ? 'active' : ''}>📅 Reservas</button>
        </nav>
      </header>

      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;