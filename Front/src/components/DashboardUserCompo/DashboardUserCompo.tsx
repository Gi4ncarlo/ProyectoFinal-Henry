"use client"
import { getuserOrdersDB } from '@/helpers/userOrders.helpers';
import { IOrderProps } from '@/interfaces/IOrdersProps';
import { IUserSession } from '@/interfaces/IUserSession';
import React, { useEffect, useState } from 'react';

// Componente para mostrar las órdenes del usuario
const DashboardUserCompo: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);  // Para mostrar el estado de carga
  const [error, setError] = useState<string | null>(null);  // Para manejar errores
  const [userSession, setUserSession] = useState<IUserSession | null>(null); // Sesión de usuario

  useEffect(() => {
    // Verifica si estamos en el cliente (solo en el navegador)
    if (typeof window !== 'undefined') {
      const storedSession = JSON.parse(localStorage.getItem('userSession') || 'null');
      setUserSession(storedSession);
    }
  }, []);

  useEffect(() => {
    if (userSession?.user?.id && userSession.token) {
      fetchOrders(userSession.user.id, userSession.token); // Usamos el id del usuario que está dentro de userSession
    }
  }, [userSession]);

  const fetchOrders = async (id: number, token: string) => {
    setLoading(true);
    try {
      const ordersData = await getuserOrdersDB(id, token);
      setOrders(ordersData);
      setError(null); // Resetear errores si la solicitud es exitosa
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error fetching orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar la interfaz de carga o error
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        console.log(orders),        
        orders.map((order) => (
          <div key={order.id}>
            <p>{order.address}</p>
            <p>{order.email}</p>
            <p>{order.servicesOrder.isApproved ? 'Approved' : 'Not Approved'}</p>
            <br />
          </div>
        ))
      )} */}
    </div>
  );
};

export default DashboardUserCompo;
