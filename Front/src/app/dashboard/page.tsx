"use client";

import DashboardAdminCompo from '@/components/DashboardAdminCompo/DashboardAdminCompo';
import UserDashboard from './userDashboard/page';
import React, { useEffect, useState } from 'react';
import GardenerDashboard from './gardenerDashboard/page';

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtén el usuario de localStorage al cargar el componente
    const user = JSON.parse(localStorage.getItem("userSession") || "null");

    if (user && user.token && user.user.role) {
      setRole(user.user.role); // Guarda el rol del usuario
    } else {
      console.log("Usuario no autorizado");
    }
  }, []);

  // Si no se ha determinado el rol, no se muestra nada mientras se carga
  if (role === null) return null;

  // Renderiza el componente correspondiente según el rol
  switch (role) {
    case "admin":
      return <DashboardAdminCompo />;
    case "gardener":
      return <GardenerDashboard/>;
    case "user":
    default:
      return <UserDashboard />;
  }
};

export default Dashboard;

