
"use client"
import React, { useState } from 'react';
import DashboardAdminCompo from '@/components/DashboardAdminCompo/DashboardAdminCompo';
import UserList from '@/components/UserList/UserList';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState<string>(''); // Controla el componente activo

  return (
    <div>
      {/* Menú de navegación */}
      <div className="bg-gray-200 p-4">
        <button
          onClick={() => setActiveComponent('userList')}
          className="p-2 bg-blue-500 text-white mr-2"
        >
          Lista de Usuarios
        </button>
        <button
          onClick={() => setActiveComponent('services')}
          className="p-2 bg-blue-500 text-white"
        >
          Servicios Disponibles
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="mt-4">
        {activeComponent === 'userList' && <UserList />} {/* Muestra la lista de usuarios */}
        {activeComponent === 'services' && <DashboardAdminCompo />} {/* Muestra los servicios */}
      </div>
    </div>
  );
};

export default AdminDashboard;
