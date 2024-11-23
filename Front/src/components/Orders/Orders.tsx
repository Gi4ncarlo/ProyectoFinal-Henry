
"use client";

import { getuserOrdersDB } from "@/helpers/userOrders.helpers";
import { IOrderProps } from "@/interfaces/IOrdersProps";
import { IUserSession } from "@/interfaces/IUserSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Componente para mostrar las órdenes del usuario
const DashboardUserCompo: React.FC = () => {
  const [orders, setOrders] = useState<any>([]);
  const [params, setParams] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");
  const [imageProfile, setImageProfile] = useState<any>("");

  useEffect(() => {
    // Usamos URLSearchParams para obtener los query params
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const paymentId = urlParams.get("payment_id");
    const externalReference = urlParams.get("external_reference");

    setParams({ status, paymentId, externalReference });
  }, []);
  useEffect(() => {
    if (params?.status === "approved") {
      const fetchOrders = async () => {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/services-order/orderPay/${params.externalReference}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN.token}`,
              "Content-Type": "application/json",
            },
          }
        );
      };
      fetchOrders();
    }
  }, [params]);

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

  useEffect(() => {
    if (userSession?.user?.id && userSession.token) {
      fetchOrders(userSession.user.id, userSession.token);
    }
  }, [userSession]);

  const fetchOrders = async (id: number, token: string) => {
    setLoading(true);
    try {
      const ordersData = await getuserOrdersDB(id, token);
      setOrders(ordersData);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };
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
    } catch (error) {
      throw error;
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-3 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Bienvenido a su historial de Operaciones
      </h1>

      {!orders[0].servicesOrder.length ? (
        <p className="text-xl mt-6 text-[#FF5722]">
          No se encontraron órdenes.
        </p>
      ) : (
        <div className="w-full max-w-6xl space-y-8">
          {orders[0].servicesOrder.map((order: any) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* ID de la Orden y Detalles Generales */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Jardinero contratado: {order.gardener.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Image
                  className="rounded-full"
                  src={order.gardener.profileImageUrl || '/default-profile.jpg'}
                  alt={`${order.gardener.name}'s profile`}
                  width={120}
                  height={120}
                />
                <div>
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
                <div>
                  <h1 className="text-gray-700 text-xl">
                    <strong>Nº de Orden:</strong>
                    <br />
                    {order.id}
                  </h1>
                  <br />
                  <p className="text-gray-700">
                    <strong>Fecha de Orden:</strong> {order.date}
                  </p>
                  <p className="text-gray-700">
                    <strong>Fecha del Servicio:</strong>{" "}
                    {false || "No esta definida"}
                  </p>
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
                <div className="flex items-center">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${order.isApproved ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {order.isApproved ? "Aprobada" : "No Aprobada"}
                  </span>
                </div>
                <div className="flex items-center"></div>
              </div>

              {/* Más Información (sección expandible si es necesario) */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Más Información
                </h3>
                <p className="text-gray-700">
                  <strong>Notas:</strong>{" "}
                  {order.notes || "No hay notas adicionales"}
                </p>
                <p className="text-gray-700">
                  <strong>Referencias:</strong> {order.references || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Comentarios:</strong>{" "}
                  {order.comments || "Ningún comentario"}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="mt-4 p-4 bg-[#4caf50] text-white text-xl font-bold rounded-lg hover:bg-[#388e3c]"
                  onClick={() => handlePayment(order.id)}
                >
                  Pagar con mercadopago
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardUserCompo;
