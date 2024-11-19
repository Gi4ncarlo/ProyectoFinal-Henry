"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IServiceProvider } from "@/interfaces/IServiceProvider";
import { getProviderById } from "@/helpers/gardeners.helpers";
import { getServicesProvided } from "@/helpers/service.helpers";
import { useParams, useRouter } from "next/navigation";
import { IService } from "@/interfaces/IService";
import { hireServices } from "@/helpers/order.helpers";

const ProviderDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [gardener, setGardener] = useState<IServiceProvider | null>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGardener = async () => {
      if (!id) {
        setError("No se proporcionó el ID del jardinero.");
        return;
      }

      try {
        const gardenerData = await getProviderById(id);
        setGardener(gardenerData);
      } catch (error) {
        console.error("Error buscando información del jardinero:", error);
        setError("No se pudo obtener la información del jardinero.");
      }
    };

    const fetchServices = async () => {
      try {
        const serviceData = await getServicesProvided();
        setServices(serviceData);
      } catch (error) {
        console.error("Error buscando los servicios:", error);
        setError("No se pudieron obtener los servicios.");
      }
    };

    fetchGardener();
    fetchServices();
  }, [id]);

  if (!gardener) return <div>Cargando...</div>;

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleHireClick = async () => {
    try {
      if (!gardener?.id) {
        setError("El ID del jardinero no está disponible.");
        return;
      }

      const userSession = localStorage.getItem("userSession");
      if (!userSession) {
        setError("No se encontró la sesión del usuario.");
        return;
      }

      const { user } = JSON.parse(userSession);
      const userId = user?.id;

      if (!userId) {
        setError("No se encontró el ID del usuario.");
        return;
      }

      const date = new Date().toISOString(); // Mejor usar formato ISO para fechas
      const isApproved = false;

      const order = await hireServices({
        date,
        isApproved,
        gardenerId: gardener.id.toString(), // Ya se asegura que gardener.id esté definido
        userId,
        serviceId: selectedServices,
      });

      console.log("Orden generada:", order);
      setSelectedServices([]);
      router.push("/dashboard/userDashboard");
    } catch (error) {
      console.error("Error al procesar la contratación:", error);
      setError("Hubo un error al intentar contratar los servicios.");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="flex bg-[#4CAF50]">
      <div className="max-w-3xl mx-auto mt-32 mb-14 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <Image
            className="rounded-full"
            src={gardener.profileImageUrl || "/default-profile.jpg"}
            alt={`${gardener.name}'s profile`}
            width={120}
            height={120}
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-[#263238]">{gardener.name}</h1>
            <p className="text-[#8BC34A]">@{gardener.username}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#263238]">Experiencia:</h2>
          <p className="text-gray-600">{gardener.experience}</p>

          <h2 className="text-lg font-semibold text-[#263238] mt-4">Puntuación:</h2>
          <div className="flex items-center mt-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < Math.floor(gardener.calification)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label={`Rating ${index + 1} star`}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.2 8.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {gardener.calification.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#263238]">Servicios Disponibles:</h2>
          <div className="mt-2">
            {services.map((service) => (
              <div key={service.id} className="mb-4">
                <label className="block text-[#263238]">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceChange(service.id)}
                    className="mr-2"
                  />
                  {service.detailService} - ${service.price} - {service.categories}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleHireClick}
            className="w-full mt-4 p-2 bg-[#4caf50] text-white font-bold rounded hover:bg-[#388e3c]"
          >
            Contratar Servicios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;
