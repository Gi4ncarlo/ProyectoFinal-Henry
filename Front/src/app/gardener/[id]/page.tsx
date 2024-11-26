'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IServiceProvider } from '@/interfaces/IServiceProvider';
import { getCarrouselById, getProviderById } from '@/helpers/gardeners.helpers';
import { getServicesProvided } from '@/helpers/service.helpers';
import { useParams, useRouter } from 'next/navigation';
import { IService } from '@/interfaces/IService';
import { hireServices } from '@/helpers/order.helpers';
import { IUserSession } from '@/interfaces/IUserSession';
import Swal from 'sweetalert2';

const ProviderDetail: any = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [gardener, setGardener] = useState<IServiceProvider | null>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [orderService, setOrderService] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [carrousel, setCarrousel] = useState<any[]>([]);

  useEffect(() => {
    const fetchGardener = async () => {
      if (id) {
        try {
          const gardenerData = await getProviderById(id);
          setGardener(gardenerData);
        } catch (error) {
          console.error('Error buscando información del jardinero:', error);
          setError('No se pudo cargar la información del jardinero.');
        }
      }
    };

    const fetchCarrousel = async () => {
      try {
        if (id) {
          const carrouselData = await getCarrouselById(id);
          setCarrousel(carrouselData?.imageUrl || []);
        }
      } catch (error) {
        console.error("Error buscando el carrousel:", error);
        setError("No se pudo cargar el carrousel.");
      }
    };

    const fetchServices = async () => {
      try {
        const serviceData = await getServicesProvided();
        setServices(serviceData);
      } catch (error) {
        console.error('Error buscando los servicios:', error);
        setError('No se pudieron cargar los servicios.');
      }
    };

    fetchGardener();
    fetchServices();
    fetchCarrousel();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedSession = JSON.parse(
        localStorage.getItem("userSession") || ""
      );
      setUserSession(storedSession);
    }
  }, []);

  // Manejar selección de servicios
  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId) // Deseleccionar
        : [...prevSelected, serviceId] // Seleccionar
    );
  };

  // Contratar servicios
  const handleHireClick = async () => {
    if (!userSession || !userSession.user?.id) {
      setError('No se encontró la sesión del usuario.');
      return;
    }

    if (!gardener) {
      setError('Información del jardinero no disponible.');
      return;
    }
    if (selectedServices.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Selecciona un servicio',
        text: 'Debes seleccionar al menos un servicio para continuar.',
      });
    }

    try {
      const order = await hireServices({
        date: new Date().toISOString(),
        isApproved: false,
        gardenerId: gardener.id.toString(),
        userId: userSession.user.id.toString(),
        serviceId: selectedServices,
      });
      // Mostrar mensaje de éxito con Swal
      Swal.fire({
        icon: 'success',
        title: 'Servicios Contratados',
        text: 'Tu orden ha sido creada con éxito.',
      });

      setOrderService(order);
      setSelectedServices([]);
      router.push('/dashboard/userDashboard');
    } catch (error) {
      console.error('Error contratando servicios:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al contratar los servicios. Inténtalo de nuevo.',
      });
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!gardener) return <div>Cargando...</div>;

  return (

    <div className="flex flex-col min-h-screen bg-[#4CAF50]">
      {/* Contenedor para centrar todo */}
      <div className="flex flex-col items-center justify-center flex-grow mx-4 md:mx-8 lg:mx-16">
        <div className="max-w-3xl mt-32 mb-14 p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center">
            <Image
              className="rounded-full"
              src={gardener.profileImageUrl || '/default-profile.jpg'}
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
                  className={`w-5 h-5 ${index < Math.floor(gardener.calification) ? 'text-yellow-400' : 'text-gray-300'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.2 8.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-500">{gardener.calification.toFixed(1)}</span>
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
                    {service.detailService}
                  </label>
                  <p className="ml-6 text-sm text-[#263238]">Precio: ${service.price}</p>
                  <p className="ml-6 text-sm text-[#263238]">Categoría: {service.categories}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={handleHireClick}
              disabled={selectedServices.length === 0} // Deshabilitado si no hay servicios seleccionados
              className={`w-full mt-4 p-2 font-bold rounded ${selectedServices.length === 0
                ? 'bg-gray-400 cursor-not-allowed' // Estilo deshabilitado
                : 'bg-[#4caf50] text-white hover:bg-[#388e3c]' // Estilo habilitado
                }`}
            >
              Contratar Servicios
            </button>

            {selectedServices.length === 0 && (
              <p className="mt-2 text-sm text-red-500">
                Debes seleccionar al menos un servicio para continuar.
              </p>
            )}
          </div>
        </div>

        {/* Carrousel */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mt-8">
          <h2 className="text-xl font-bold text-[#4CAF50] mb-4 text-center p-3">Galería de {gardener.name}:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {carrousel?.map((image: any, index: number) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-40"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Espaciado para mostrar las reseñas*/}





      {/* Espaciado con el footer */}
      <footer className="mt-8 p-4 bg-[#263238] text-white text-center">
        © {new Date().getFullYear()} Jardineros. Todos los derechos reservados.
      </footer>
    </div>
  );



};

export default ProviderDetail;
