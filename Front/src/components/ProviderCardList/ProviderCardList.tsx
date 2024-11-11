"use client"


import React, { useEffect, useState } from 'react';
import ProviderCard from '../ProviderCard/ProviderCard';
import { IServiceProvider } from '@/interfaces/IServiceProvider';
import { getGardenersDB } from '@/helpers/gardeners.helpers';

const ProviderCardList: React.FC = () => {
  const [providers, setProviders] = useState<IServiceProvider[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const gardeners = await getGardenersDB();
        setProviders(gardeners);
      } catch (error) {
        setError('Error al cargar los productos');
      }
    };

    fetchProviders();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {providers.map((gardener) => (
        <ProviderCard
          key={gardener.id}
          providerName={gardener.providerName}
          description={gardener.description}
          imageUrl={gardener.imageUrl}
          rating={gardener.rating}
        />
      ))}
    </div>
  );
};

export default ProviderCardList;
