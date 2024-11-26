"use client";
import React, { useState } from "react";
import UserList from "@/components/UserList/UserList";
import Services from "@/components/Services/Services";
//import ListGardeners from "@/components/ListGardeners/ListGardeners";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState<string>(""); // Controla el componente activo

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Barra de navegación */}
      <div className="bg-green-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveComponent("userList")}
            className={`px-4 py-2 rounded-lg transition ${activeComponent === "userList"
                ? "bg-white text-green-600"
                : "bg-green-700 hover:bg-green-800"
              }`}
          >
            Lista de Usuarios
          </button>
          <button
            onClick={() => setActiveComponent("services")}
            className={`px-4 py-2 rounded-lg transition ${activeComponent === "services"
                ? "bg-white text-green-600"
                : "bg-green-700 hover:bg-green-800"
              }`}
          >
            Servicios Disponibles
          </button>


          <button
            onClick={() => setActiveComponent("ListGardeners")}
            className={`px-4 py-2 rounded-lg transition ${activeComponent === "ListGardeners"
                ? "bg-white text-green-600"
                : "bg-green-700 hover:bg-green-800"
              }`}
          >
            Lista de Jardineros
          </button>
        </div>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-grow p-6">
        {activeComponent === "userList" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <UserList />
          </div>
        )}
        {activeComponent === "services" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Services />
          </div>
        )}
        {activeComponent === "ListGardeners" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* <ListGardeners/> */}
          </div>
        )}
        {/* Mensaje inicial si no hay selección */}
        {!activeComponent && (
          <div className="text-gray-500 text-center mt-20">
            <p className="text-lg">Selecciona una opción del menú para empezar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
