"use client"
import { getuserOrdersDB } from '@/helpers/userOrders.helpers';
import { IOrderProps } from '@/interfaces/IOrdersProps';
import { IUserSession } from '@/interfaces/IUserSession';
import { stat } from 'fs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

// Componente para mostrar las órdenes del usuario
const DashboardUserCompo: React.FC = () => {
  const [orders, setOrders] = useState<any>([]);
  const [params, setParams] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);  // Para mostrar el estado de carga
  const [error, setError] = useState<string | null>(null);  // Para manejar errores
  const [userSession, setUserSession] = useState<IUserSession | null>(null); // Sesión de usuario
  const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");


  useEffect(() => {
    // Usamos URLSearchParams para obtener los query params
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const paymentId = urlParams.get('payment_id');
    const externalReference = urlParams.get('external_reference');

    setParams({ status, paymentId, externalReference });
    
  }, []);

  
  if (params?.status === 'approved') {    
    const fetchOrders = async () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/services-order/orderPay/${orders[0].servicesOrder[0].id}`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN.token}`,
          "Content-Type": "application/json",
        },
      })
    };
    fetchOrders();
  }
  console.log(params?.status);
  if(params?.status === 'failure' || params?.status === 'rejected'){
    Swal.fire({
      title: 'Error',
      text: 'El pago ha fallado',
      icon: 'error'
    })
  }
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
      console.log(ordersData);

      setError(null); // Resetear errores si la solicitud es exitosa
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error fetching orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const handlePayment = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mercadopago/create-payment/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN.token}`,
          "Content-Type": "application/json",
        },
      }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data.paymentUrl.init_point);

      if (data.paymentUrl.sandbox_init_point) {
        window.location.href = data.paymentUrl.sandbox_init_point;
      }

    } catch (error) {
      throw error;
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard de Órdenes de Compra</h1>

      {orders.length === 0 ? (
        <p className="text-xl text-gray-500">No se encontraron órdenes.</p>
      ) : (
        <div className="w-full max-w-6xl space-y-8">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* ID de la Orden y Detalles Generales */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Jardinero contratado: {order.servicesOrder[0].gardener.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700"><strong>Dirección:</strong> {order.servicesOrder[0].gardener.address}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {order.servicesOrder[0].gardener.email}</p>
                  <p className="text-gray-700"><strong>Teléfono:</strong> {order.servicesOrder[0].gardener.phone}</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong>Fecha de Orden:</strong> {order.servicesOrder[0].date.split('T')[0]}</p>
                  <p className="text-gray-700"><strong>Fecha del Servicio:</strong> {false || 'No esta definida'}</p>
                  <p className="text-gray-700"><strong>Monto Total:</strong> ${order.servicesOrder[0].serviceProvided[0].price}</p>
                </div>
              </div>

              {/* Detalles del Servicio */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Detalles del Servicio</h3>
                <p className="text-gray-700"><strong>Servicio:</strong> {order.servicesOrder[0].serviceProvided[0].detailService}</p>
                <p className="text-gray-700"><strong>Categorias del jardinero:</strong> {order.servicesOrder[0].serviceProvided[0].categories[0]}</p>
                <p className="text-gray-700"><strong>Cantidad:</strong> 1 </p>
                <p className="text-gray-700"><strong>Precio Unitario:</strong> ${order.servicesOrder[0].serviceProvided[0].price}</p>
                <p className="text-gray-700"><strong>SubTotal:</strong> ${order.servicesOrder[0].serviceProvided[0].price}</p>
              </div>

              {/* Estado y Pago */}
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${order.servicesOrder.isApproved ? 'bg-green-500' : 'bg-red-500'
                      }`}
                  >
                    {order.servicesOrder.isApproved ? 'Aprobada' : 'No Aprobada'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${order.paymentStatus === 'Pagado' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Más Información (sección expandible si es necesario) */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Más Información</h3>
                <p className="text-gray-700"><strong>Notas:</strong> {order.notes || 'No hay notas adicionales'}</p>
                <p className="text-gray-700"><strong>Referencias:</strong> {order.references || 'N/A'}</p>
                <p className="text-gray-700"><strong>Comentarios:</strong> {order.comments || 'Ningún comentario'}</p>
              </div>

              <button className="mt-6 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                onClick={() => handlePayment(order.servicesOrder[0].id)}>
                Pagar con mercadopago
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardUserCompo;
