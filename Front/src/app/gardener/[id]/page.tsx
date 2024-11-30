"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IServiceProvider } from "@/interfaces/IServiceProvider";
import { getCarrouselById, getProviderById } from "@/helpers/gardeners.helpers";
import { getServicesProvided } from "@/helpers/service.helpers";
import { useParams, useRouter } from "next/navigation";
import { IService } from "@/interfaces/IService";
import { hireServices } from "@/helpers/order.helpers";
import { IUserSession } from "@/interfaces/IUserSession";
import Swal from "sweetalert2";
import GardenerCalendar from "@/components/GardenerCalendar/GardenerCalendar";
import GardenerMap from "@/components/GardenerMap/GardenerMap"; // Importa el componente GardenerMap
import { Rate } from "antd";
import { fetchReviews } from "@/helpers/comments.helpers";
import { Checkbox } from "antd";

const ProviderDetail: React.FC = () => {
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGardener = async () => {
      if (id) {
        try {
          const gardenerData = await getProviderById(id);
          setGardener(gardenerData);

          // Convertir dirección a coordenadas
          if (gardenerData) {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                gardenerData.address
              )}`
            );
            const data = await response.json();
            if (data.length > 0) {
              setCoordinates({
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
              });
            } else {
              console.error(
                "No se encontraron coordenadas para la dirección proporcionada."
              );
            }
          }
        } catch (error) {
          console.error("Error buscando información del jardinero:", error);
          setError("No se pudo cargar la información del jardinero.");
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

    const fetchServices = async (id: any) => {
      try {
        const serviceData = await getServicesProvided(id);
        setServices(serviceData);
      } catch (error) {
        console.error("Error buscando los servicios:", error);
        setError("No se pudieron cargar los servicios.");
      }
    };

    fetchGardener();
    fetchServices(id);
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

  {
    /*Solicitud de reseñas */
  }
  useEffect(() => {
    const fetchGardenerReviews = async () => {
      if (id) {
        try {
          const reviewsData = await fetchReviews(id);
          console.log("reviewsData", reviewsData);

          setReviews(reviewsData || []);
        } catch (error) {
          console.error("Error  en obtener las reseñas:", error);
        }
      }
    };

    fetchGardenerReviews();
  }, [id]);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find((service) => service.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleHireClick = async () => {
    if (!userSession || !userSession.user?.id) {
      setError("No se encontró la sesión del usuario.");
      return;
    }

    if (!gardener) {
      setError("Información del jardinero no disponible.");
      return;
    }
    if (selectedServices.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona un servicio",
        text: "Debes seleccionar al menos un servicio para continuar.",
      });
    }

    if (!selectedDate) {
      setError("Por favor, seleccione una fecha.");
      return;
    }
    setLoading(true);

    try {
      const order = await hireServices({
        date: selectedDate,
        isApproved: false,
        gardenerId: gardener.id.toString(),
        userId: userSession.user.id.toString(),
        serviceId: selectedServices,
      });
      setLoading(false);
      // Mostrar mensaje de éxito con Swal
      Swal.fire({
        icon: "success",
        title: "Servicios Contratados",
        text: "Tu orden ha sido creada con éxito.",
      });

      setOrderService(order);
      setSelectedServices([]);
      setSelectedDate(null);
      router.push("/dashboard/userDashboard");
    } catch (error) {
      console.error("Error contratando servicios:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al contratar los servicios. Inténtalo de nuevo.",
      });
    }
  };

  if (loading) {
    return (
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

  if (error) return <div className="text-red-500">{error}</div>;
  if (!gardener)
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-green-300 border-t-green-500 rounded-full animate-spin mb-4"></div>

        {/* Texto */}
        <h2 className="text-xl font-semibold text-[#263238]">
          Cargando la informacion..
        </h2>
      </div>
    );
  return (
    <div className="flex flex-col min-h-screen bg-[url('/images/fondoJardineros2.webp')] bg-cover bg-center">
      {/* Contenedor para centrar todo */}
      <div className="flex flex-col items-center justify-center flex-grow mx-4 md:mx-8 lg:mx-16">
        <div className="max-w-3xl mt-32 mb-14 p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center">
            <Image
              className="rounded-full"
              src={gardener.profileImageUrl || "/nuevo_usuarioGardener.jpg"}
              alt={`${gardener.name}'s profile`}
              width={120}
              height={120}
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-[#263238]">
                {gardener.name}
              </h1>
              <p className="text-[#8BC34A]">@{gardener.username}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#263238]">
              Experiencia:
            </h2>
            <p className="text-gray-600">{gardener.experience}</p>

            <h2 className="text-lg font-semibold text-[#263238] mt-4">
              Puntuación:
            </h2>
            <div className="flex items-center mt-3">
              <Rate
                allowHalf
                disabled
                defaultValue={gardener.calification}
                style={{ color: "#FFD700" }} // Color dorado para las estrellas
              />
              <span className="ml-2 text-sm text-gray-500">
                {gardener.calification.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex snap-x snap-mandatory overflow-x-auto mt-6">
              {carrousel?.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative snap-center flex-none w-full"
                  style={{ maxWidth: "400px" }}
                >
                  <Image
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                ))}
              </div>
          {/* Agregar el componente GardenerMap aquí */}
          <div className="mt-10">
            <GardenerMap location={coordinates} />
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#263238]">
              Servicios Disponibles:
            </h2>
            <ul className="mt-4">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="flex justify-between items-center py-2 border-b border-gray-200"
                >
                  <div className="flex-1 text-left">
                    <span className="font-medium text-gray-800">
                      {service.detailService}
                    </span>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="font-semibold text-green-600">
                      ${service.price}
                    </span>
                  </div>
                  <div className="flex-1 text-right">
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-xl bg-[#8BC34A] rounded-lg font-bold text-[#263238] flex justify-center">
                Total:{" "}
                <span className="text-[#263238]">${calculateTotal()}</span>
              </h3>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#263238]">
                Calendario de Disponibilidad:
              </h2>
              <GardenerCalendar
                gardenerId={gardener.id.toString()}
                onDateSelect={handleDateSelect}
              />
            </div>

          <div className="">
            <h2 className="text-lg font-semibold text-[#263238]">
              Reseñas de Clientes:
            </h2>
            {reviews.length > 0 ? (
              <div className="mt-4">
                {reviews.map((review) => (
                  <div key={review.id} className="mb-4 border-b pb-4">
                    <div className="flex items-center mt-3">
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={review.rate}
                        style={{ color: "#FFD700" }}
                      />
                      <span className="ml-2 text-sm text-gray-500">
                        {review.rate.toFixed(1)}
                      </span>

                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay reseñas disponibles.</p>
            )}
          </div>
        </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleHireClick}
                  className="mt-4 w-full bg-[#4CAF50] text-white py-2 px-4 rounded-lg hover:bg-[#45a049]"
                >
                  Contratar Servicios
                </button>
              </div>
            </div>

        <div className="flex items-center justify-center w-full mt-10">
          <button
            onClick={() => router.push("/gardener")}
            className="px-6 py-3 mb-8 text-[#263238] bg-[#CDDC39] rounded-lg shadow-md hover:bg-[#8BC34A] focus:ring-4 focus:ring-[#689F38] transition-all"
          >
            Volver a la lista de jardineros
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;
