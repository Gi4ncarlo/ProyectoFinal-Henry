"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
  );
};

export default ProviderCardList;
