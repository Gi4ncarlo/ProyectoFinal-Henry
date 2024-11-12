"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProviderCard from '../ProviderCard/ProviderCard';
import { IServiceProvider } from '@/interfaces/IServiceProvider';
import { getGardenersDB } from '@/helpers/gardeners.helpers';
import { useRouter } from 'next/navigation';

const ProviderCardList: React.FC = () => {
  const [providers, setProviders] = useState<IServiceProvider[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('ASC'); // Default order filter
  const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")
  const router = useRouter();
  if(!TOKEN){
    router.push('/login')
  }

  const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Si `filter` es numérico, lo interpretamos como una calificación.
        const order = filter === 'ASC' || filter === 'DESC' ? filter : 'ASC';
        const calification = isNaN(Number(filter)) ? undefined : Number(filter);

        const gardeners = await getGardenersDB(order, calification);
        setProviders(gardeners.data);
        console.log(gardeners);
        
        
      } catch (error) {
        setError('Error al cargar los productos');
      }
    };
    console.log(fetchProviders());
  }, [filter]); // Vuelve a cargar cada vez que cambia el filtro

  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto">
      <div className="flex justify-end mb-4">
        <select
          className="border rounded p-2"
          value={filter}
          onChange={handleFilter}
        >
          <option value="">Sort by</option>
          <option value="ASC">Alphabetical ⬆</option>
          <option value="DESC">Alphabetical ⬇</option>
          <option value="1"> ⭐</option>
          <option value="2"> ⭐⭐</option>
          <option value="3"> ⭐⭐⭐</option>
          <option value="4"> ⭐⭐⭐⭐</option>
          <option value="5"> ⭐⭐⭐⭐⭐</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
        { providers.map((gardener) => (
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