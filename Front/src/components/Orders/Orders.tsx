"use client";

import { deleteOrder, getuserOrdersDB } from "@/helpers/userOrders.helpers";
import { IOrderProps } from "@/interfaces/IOrdersProps";
import { IUserSession } from "@/interfaces/IUserSession";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "./modal";
import { format } from "date-fns";
import { fetchComments } from "@/helpers/comments.helpers";

// Componente para mostrar las órdenes del usuario
const DashboardUserCompo: React.FC = () => {
  const [orders, setOrders] = useState<any>([]);
  const [params, setParams] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");
  const [imageProfile, setImageProfile] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Para almacenar la orden seleccionada
  const [status, setStatus] = useState<string | null>("");
  
  let contador = 0;

  const handleOpenModal = (order: any) => {
    setSelectedOrder(order); // Establecer la orden seleccionada
    setShowModal(true); // Mostrar el modal
  };
  
  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedOrder(null); // Resetear la orden seleccionada
  };
  const showRatingModal = async (id: string) => {
    Swal.fire({
      title: 'Califica el Servicio',
      html: `
        <input id="comentario" class="swal2-input swal2-input" style="width: 90%; margin: 0 auto;" placeholder="Escribe tu comentario..." />
        <input id="calificacion" type="range" min="1" max="5" value="5" class="swal2-input" style="width: 90%; margin: 0 auto;" />
        <div style="text-align: center;">
          <span id="rangeValue">5</span> / 5
        </div>
      `,
      focusConfirm: false,
      preConfirm: async () => {
        const comentario = (document.getElementById('comentario') as HTMLInputElement).value;
        const calificacion = (document.getElementById('calificacion') as HTMLInputElement).value;
        return { comentario, calificacion };
      },
      didOpen: async () => {
        const rangeInput = document.getElementById('calificacion');
        const rangeValue = document.getElementById('rangeValue');

        if (rangeInput !== null && rangeValue !== null) {
          rangeInput.addEventListener('input', (e) => {
            rangeValue.textContent = (e.target as HTMLInputElement).value;
          });
        } else {
          console.error('Los elementos no se encontraron en el DOM');
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { comentario, calificacion } = result.value;
        console.log('Comentario:', comentario);
        console.log('Calificación:', calificacion);
        const comments = await fetchComments(id, { comentario, calificacion });

        Swal.fire({
          title: '¡Reseña creada con éxito!',
          text: 'Puedes ver tu reseña en el perfil del jardinero.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  };



  useEffect(() => {
    // Usamos URLSearchParams para obtener los query params
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    setStatus(status);
    const paymentId = urlParams.get("payment_id");
    const externalReference = urlParams.get("external_reference");


    console.log("cambie el estado a ", status);
    
    setParams({ status, paymentId, externalReference });

  }, []);

  if (
    params?.status === "failure" ||
    params?.status === "rejected" ||
    params?.status === "null"
  ) {
    Swal.fire({
      title: "Error",
      text: "El pago ha fallado",
      icon: "error",
    });
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSession = JSON.parse(
        localStorage.getItem("userSession") || ""
      );
      setUserSession(storedSession);
    }
  }, []);

  const fetchOrders = async (id: number, token: string) => {
    setLoading(true);
    try {
      setOrders([]);
      const ordersData = await getuserOrdersDB(id, token);
      setOrders(ordersData);
      setError(null);
      
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrders = async (id : string) => {
    try {
      await deleteOrder(id);
      Swal.fire({
        title: "Orden Eliminada",
        text: "Orden eliminada correctamente",
        icon: "success",
        confirmButtonText: "OK",
      })
      if (userSession?.user?.id && userSession.token) {
        fetchOrders(userSession.user.id, userSession.token);
      }
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      Swal.fire({
        title: "Error",
        text: "Error al eliminar la orden",
        icon: "error",
        confirmButtonText: "OK",
      })

    }
  }

  const handlePayment = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mercadopago/create-payment/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.paymentUrl.sandbox_init_point) {
        window.location.href = data.paymentUrl.sandbox_init_point;
      }
      setStatus("approved");
     // if (params?.status === "approved") {
       
         await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/services-order/orderPay/${params.externalReference}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${TOKEN.token}`,
                "Content-Type": "application/json",
              },
            }
          );
      //}
    } catch (error) {
      throw error;
    }
  };

  
  useEffect(() => {
    if (userSession?.user?.id && userSession.token) {
      fetchOrders(userSession.user.id, userSession.token);
    }
  }, [userSession, status]);


  if (loading) {
    return(
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-green-300 border-t-green-500 rounded-full animate-spin mb-4"></div>

        {/* Texto */}
        <h2 className="text-xl font-semibold text-[#263238]">
          Cargando la informacion..
        </h2>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }
 
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-12">
        Bienvenido a su historial de Operaciones
      </h1>

      {!orders[0].servicesOrder.length ? (
        <p className="text-xl mt-6 text-[#FF5722]">
          No se encontraron órdenes.
        </p>
      ) : (
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {orders[0].servicesOrder.map((order: any) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {!order.isApproved ? (
                <button onClick={() => deleteOrders(order.id)} className="absolute top-4 right-4 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center">X</button>
                
              ) : ""}
              {/* ID de la Orden y Detalles Generales */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Jardinero contratado: {order.gardener.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Imagen del jardinero */}
                <div className="flex justify-center items-center">
                  <Image
                    className="rounded-full w-28 h-28 object-cover"
                    src={order.gardener.profileImageUrl || "/default-profile.jpg"}
                    alt={`${order.gardener.name}'s profile`}
                    width={120}
                    height={120}
                  />
                </div>

                {/* Información del jardinero */}
                <div className="flex flex-col space-y-3">
                  <p className="text-gray-700">
                    <strong>Dirección:</strong> {order.gardener.address}
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {order.gardener.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Teléfono:</strong> {order.gardener.phone}
                  </p>
                </div>

                {/* Información de la orden */}
                <div className="flex flex-col space-y-3">
                  <h1 className="text-gray-700 text-xl">
                    <strong>Nº de Orden:</strong>
                    <br />
                    {order.id}
                  </h1>
                  <p className="text-gray-700">
                    <strong>Fecha de Orden:</strong> {order.date}
                  </p>
                  <strong>Fecha del Servicio:</strong>{" "}
                  {order.orderDetail
                    ? order.orderDetail.startTime
                    : "No está definida"}
                </div>
              </div>

              {/* Detalles del Servicio */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Detalles del Servicio
                </h3>
                {order.serviceProvided.map((s: any) => (
                  <div key={s.id}>
                    <p className="text-gray-700">
                      <strong>Servicio:</strong> {s.detailService}
                    </p>
                    <p className="text-gray-700">
                      <strong>Precio Unitario:</strong> ${s.price}
                    </p>
                  </div>
                ))}
                <p className="text-gray-700">
                  <strong>Cantidad:</strong> {order.serviceProvided.length}{" "}
                </p>
                <p className="text-gray-700 text-2xl mt-4">
                  <strong>Total:</strong> $
                  {order.serviceProvided.reduce(
                    (acc: number, s: any) => acc + s.price,
                    0
                  )}
                </p>
              </div>

              {/* Estado y Pago */}
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${order.isApproved ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {order.isApproved ? `Pagada: Estado del trabajo ${order.orderDetail.status}` : "Pendiente de Pago"}
                  </span>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-between mt-6 gap-4">
                {/* Botón de pago solo si no está aprobada */}
                {!order.isApproved && (
                  <button
                    className="py-2 px-4 bg-[#4caf50] text-white text-sm font-medium rounded-lg hover:bg-[#388e3c] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#388e3c] w-full"
                    onClick={() => handlePayment(order.id)}
                  >
                    Pagar con MercadoPago
                  </button>
                )}

                {/* Botón "Ver detalles" */}
                {order.isApproved && (
                  <button
                    className="py-2 px-4 bg-[#4CAF50] text-white text-sm font-medium rounded-lg hover:bg-[#388e3c] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1976d2] w-full"
                    onClick={() => handleOpenModal(order.orderDetail)}
                  >
                    Ver detalles
                  </button>
                )}

                {/* Botón para calificar el servicio si está finalizado */}
                {order?.orderDetail?.status === "Finalizado" && !order?.reviews && (
                  <button
                    className="p-3 bg-[#ff9800] text-white text-lg font-medium rounded-lg hover:bg-[#f57c00] transition-colors w-full"
                    onClick={() => showRatingModal(order.id)}
                  >
                    Califica el Servicio
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        show={showModal}
        onClose={handleCloseModal}
        orderDetail={selectedOrder}
      />
    </div>

  );
};

export default DashboardUserCompo;
