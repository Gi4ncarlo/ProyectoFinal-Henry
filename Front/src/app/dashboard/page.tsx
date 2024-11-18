"use client";


import UserDashboard from './userDashboard/page';
import React, { useEffect, useState } from 'react';
import GardenerDashboard from './gardenerDashboard/page';
import Swal from 'sweetalert2';
import AdminDashboard from './adminDashboard/page';

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtén el usuario de localStorage al cargar el componente
    const user = JSON.parse(localStorage.getItem("userSession") || "null");

    if (user && user.token && user.user.role) {
      setRole(user.user.role); // Guarda el rol del usuario
    } else {
      Swal.fire({
        title: "Error",
        text: "Debes iniciar sesion primero",
        icon: "error",
      }).then(() => {
        window.location.href = "/";
      })
    }
  }, []);

  // Si no se ha determinado el rol, no se muestra nada mientras se carga
  if (role === null) return null;

  // Renderiza el componente correspondiente según el rol
  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "gardener":
      return <GardenerDashboard/>;
    case "user":
    default:
      return <UserDashboard />;
  }
};

export default Dashboard;

