"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServicesProvided } from '@/helpers/service.helpers';

interface ServiceProvided {
  id: string;
  detailService: string;
  price: number;
}

const Home: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [services, setServices] = useState<ServiceProvided[]>([]);
  const [isMounted, setIsMounted] = useState(false); // Nuevo estado para verificar si el componente está montado
  const router = useRouter();

  // Efecto para verificar si el componente está montado
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      if (!isMounted) return; // Esperamos hasta que el componente esté montado

      // Obtenemos el token del localStorage
      const userSession = localStorage.getItem("userSession");
      const tokenData = userSession ? JSON.parse(userSession) : null;

      // Verificamos si existe el token
      if (!tokenData || !tokenData.token) {
        console.error('Token not found');
        return;
      }

      try {
        // Obtenemos los servicios usando el helper
        const fetchedServices = await getServicesProvided(tokenData.token);
        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [isMounted]);

  const handleSearch = () => {
    if (selectedService) {
      router.push(`/gardener/${selectedService}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-green-800 mb-8">¡Bienvenido a Vicnasol!</h1>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full mb-12">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full sm:w-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.detailService} - ${service.price}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className={`w-full sm:w-auto px-6 py-3 rounded-md text-white font-semibold transition duration-200 ease-in-out ${
              selectedService 
                ? 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedService}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="mt-12 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Descubra el placer de la jardinería</h2>
        <p className="text-green-700">
          Si usted es un jardinero experimentado, recién comienza o busca contratar servicios profesionales,
          tenemos todo lo que necesita para ayudar a que su jardín y su negocio florezcan.
        </p>
      </div>
    </main>
  );
};

export default Home;
