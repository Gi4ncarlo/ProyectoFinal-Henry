"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProviderCard from '../ProviderCard/ProviderCard';
import { IServiceProvider } from '@/interfaces/IServiceProvider';
import { getGardenersDB } from '@/helpers/gardeners.helpers';
import { FaSearch } from 'react-icons/fa';

const ProviderCardList: React.FC = () => {
  const [providers, setProviders] = useState<IServiceProvider[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProviders = async (name = "") => {
      try {
        const gardeners = await getGardenersDB(name);
        setProviders(gardeners);
      } catch (error) {
        setError(error.message || 'Error al cargar los productos');
      }
    };

    fetchProviders(searchTerm);
  }, [searchTerm]); // Llama a fetchProviders cada vez que searchTerm cambia

  if (error) return <div>{error}</div>;

  return (
    <div className="text-center mb-8 mx-auto">
    <div className="relative w-1/2 mx-auto flex items-center mb-8">
      <input
        type="text"
        placeholder="Buscar jardinero..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-4 pr-12 py-2 text-lg rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <FaSearch className="absolute right-4 text-gray-500" />
   </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
      {providers.map((gardener) => (
        <Link href={`/gardener/${gardener.id}`} key={gardener.id}>
          <ProviderCard
            name={gardener.name}
            experience={gardener.experience}
            profileImageUrl={gardener.profileImageUrl}
            calification={gardener.calification}
          />
        </Link>
      ))}
    </div>
    </div>
  );
};

export default ProviderCardList;
