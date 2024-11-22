"use client";

import { getServicesProvided } from "@/helpers/service.helpers";
import { IService } from "@/interfaces/IService";
import React, { useEffect, useState } from "react";

const DashboardAdminCompo = () => {
  const [services, setServices] = useState<IService[]>([]); // Servicios disponibles
  const [sortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    // Cargar los servicios cuando el componente se monta
    fetchServices();
  }, [sortOrder]);

  // Fetch para obtener los servicios
  const fetchServices = async () => {
    try {
      const serviceData = await getServicesProvided();
      setServices(serviceData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Servicios Disponibles
      </h1>

      {services.length === 0 ? (
        <p className="text-gray-500 text-center">No hay servicios disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg text-gray-800 mb-2">
                {service.detailService}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Categoría: </span>
                {service.categories}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Precio: </span>
                ${service.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardAdminCompo;
