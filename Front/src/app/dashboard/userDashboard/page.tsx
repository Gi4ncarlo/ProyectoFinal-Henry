'use client'
import React, { useState } from 'react';
import Orders from "../../../components/Orders/Orders"
import UserProfile from "../../../components/UserProfile/UserProfile"

const UserDashboard = () => {
  const [activeComponent, setActiveComponent] = useState<string>('orders'); // Controla el componente activo

  return (
    <div>
      {/* Menú de navegación */}
      <div className="bg-gray-200 p-4">
        <button
          onClick={() => setActiveComponent('orders')}
         
          className=" p-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Órdenes
        </button>
        <button
          onClick={() => setActiveComponent('userProfile')}
      
          className="ml-4 p-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Perfil de Usuario
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="mt-4">
        {activeComponent === 'orders' && <Orders />} {/* Muestra las órdenes */}
        {activeComponent === 'userProfile' && <UserProfile />} {/* Muestra el perfil de usuario */}
      </div>
    </div>
  );
};

export default UserDashboard;
