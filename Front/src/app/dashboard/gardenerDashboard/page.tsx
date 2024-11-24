"use client"
import React, { useState } from 'react';

const GardenerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState<string>(''); // Controla el componente activo

  return (
    <div>
      {/* Menú de navegación */}
      <div className="bg-gray-200 p-4">
        <button
          onClick={() => setActiveComponent('tasks')}
          className="p-2 bg-blue-500 text-white mr-2"
        >
          Tareas
        </button>
        <button
          onClick={() => setActiveComponent('calendar')}
          className="p-2 bg-blue-500 text-white"
        >
          Calendario
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="mt-4">
        {activeComponent === 'tasks' && <div>Tareas del Jardinero</div>} {/* Mostrar tareas */}
        {activeComponent === 'calendar' && <div>Calendario del Jardinero</div>} {/* Mostrar calendario */}
      </div>
    </div>
  );
};

export default GardenerDashboard;
