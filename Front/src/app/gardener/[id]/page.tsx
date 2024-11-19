"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

// Interfaces
import { IServiceProvider } from "@/interfaces/IServiceProvider";
import { IService } from "@/interfaces/IService";

// Helpers
import { getProviderById } from "@/helpers/gardeners.helpers";
import { getServicesProvided } from "@/helpers/service.helpers";
import { hireServices } from "@/helpers/order.helpers";

// Componente de autenticación del cliente
const withClientAuth = (WrappedComponent: React.ComponentType) => {
  return function ClientAuthWrapper(props: any) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return <div>Cargando...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

const ProviderDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  // Estados
  const [gardener, setGardener] = useState<IServiceProvider | null>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch del jardinero
        if (id) {
          const gardenerData = await getProviderById(id);
          setGardener(gardenerData);
        }

        // Fetch de servicios
        const serviceData = await getServicesProvided();
        setServices(serviceData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("No se pudieron cargar los datos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Manejo de selección de servicios
  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  // Manejo de contratación de servicios
  const handleHireClick = async () => {
    // Verificación de sesión de manera segura
    if (typeof window === 'undefined') return;

    try {
      // Obtener sesión de usuario de manera segura
      const userSessionString = localStorage.getItem("userSession");
      
      if (!userSessionString) {
        router.push("/login");
        return;
      }

      const { user } = JSON.parse(userSessionString);
      const userId = user?.id;

      if (!userId) {
        router.push("/login");
        return;
      }

      // Validaciones de servicios y jardinero
      if (selectedServices.length === 0) {
        setError("Debe seleccionar al menos un servicio");
        return;
      }

      if (!gardener?.id) {
        setError("No se ha seleccionado un jardinero válido");
        return;
      }

      // Crear orden de servicios
      await hireServices({
        date: new Date().toISOString(),
        isApproved: false,
        gardenerId: gardener.id.toString(),
        userId,
        serviceId: selectedServices,
      });

      // Limpiar selección y redirigir
      setSelectedServices([]);
      router.push("/dashboard/userDashboard");
    } catch (error) {
      console.error("Error al contratar servicios:", error);
      setError("No se pudo contratar el servicio. Inténtelo de nuevo.");
    }
  };

  // Estados de carga y error
  if (isLoading) return <div>Cargando datos...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!gardener) return <div>No se encontró el jardinero</div>;

  // Renderizado de estrellas de calificación
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.2 8.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>
    ));
  };

  return (
    <div className="flex bg-[#4CAF50] min-h-screen">
      <div className="max-w-3xl mx-auto mt-32 mb-14 p-6 bg-white rounded-lg shadow-lg">
        {/* Perfil del jardinero */}
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

        {/* Experiencia y calificación */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#263238]">Experiencia:</h2>
          <p className="text-gray-600">{gardener.experience}</p>

          <h2 className="text-lg font-semibold text-[#263238] mt-4">Puntuación:</h2>
          <div className="flex items-center mt-3">
            {renderStars(gardener.calification)}
            <span className="ml-2 text-sm text-gray-500">
              {gardener.calification.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Servicios disponibles */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#263238]">
            Servicios Disponibles:
          </h2>
          <div className="mt-2">
            {services.map((service) => (
              <div key={service.id} className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id={`service-${service.id}`}
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceChange(service.id)}
                  className="mr-3 h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50]"
                />
                <label 
                  htmlFor={`service-${service.id}`} 
                  className="flex-grow cursor-pointer"
                >
                  <p className="text-sm text-[#263238] font-medium">
                    {service.detailService}
                  </p>
                  <div className="text-xs text-gray-500">
                    <span>Precio: ${service.price} | </span>
                    <span>Categoría: {service.categories}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Botón de contratación */}
        <div className="mt-6">
          <button
            onClick={handleHireClick}
            disabled={selectedServices.length === 0}
            className={`w-full p-3 text-white font-bold rounded transition-colors duration-300 ${
              selectedServices.length > 0
                ? "bg-[#4CAF50] hover:bg-[#45a049]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Contratar Servicios
          </button>
        </div>
      </div>
    </div>
  );
};

// Envolver el componente con autenticación del cliente
export default withClientAuth(ProviderDetail);
