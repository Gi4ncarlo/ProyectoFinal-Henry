"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IServiceProvider } from '@/interfaces/IServiceProvider';
import { getProviderById } from '@/helpers/gardeners.helpers';
import { useParams } from 'next/navigation';

const ProviderDetail: React.FC = () => {
  const { id } = useParams();
  const [gardener, setGardener] = useState<IServiceProvider | null>(null);

  useEffect(() => {
    const fetchGardener = async () => {
      if (id) {
        try {
          const gardenerData = await getProviderById(id as string);
          setGardener(gardenerData);
        } catch (error) {
          console.error('Error fetching gardener data:', error);
        }
      }
    };

    fetchGardener();
  }, [id]);

  if (!gardener) return <div>Loading...</div>;

  const handleHireClick = () => {
    // Aquí se añadirá la lógica para contratar al jardinero
  };

  return (
    <div className="flex">
    <div className="max-w-3xl mx-auto mt-32 p-6 bg-white rounded-lg shadow-lg">
      {/* Imagen de perfil */}
      <div className=" flex items-center">
        <Image
          className="rounded-full"
          src={gardener.profileImageUrl || '/default-profile.jpg'}
          alt={`${gardener.name}'s profile`}
          width={120}
          height={120}
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold text-gray-900">{gardener.name}</h1>
          <p className="text-gray-500">@{gardener.username}</p>
        </div>
      </div>

      {/* Detalles del jardinero */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Experience:</h2>
        <p className="text-gray-600">{gardener.experience}</p>

        <h2 className="text-lg font-semibold text-gray-700 mt-4">Rating:</h2>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${index < Math.floor(gardener.calification) ? 'text-yellow-400' : 'text-gray-300'}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-label={`Rating ${index + 1} star`}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.2 8.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-500">{gardener.calification.toFixed(1)}</span>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mt-4">Cost per hour:</h2>
        <p className="text-gray-600">${gardener.costPerHour}</p>
      </div>

      {/* Botón para contratar los servicios */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleHireClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Hire Services
        </button>
      </div>
    </div>
  </div>
  );
};

export default ProviderDetail;
