"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProviderCard from '../ProviderCard/ProviderCard';
import { IServiceProvider } from '@/interfaces/IServiceProvider';
import { getGardenersDB } from '@/helpers/gardeners.helpers';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { IUserSession } from '@/interfaces/IUserSession';



const ProviderCardList: React.FC = () => {
  const [providers, setProviders] = useState<IServiceProvider[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [TOKEN, setTOKEN] = useState<any>(null);
  const [filter, setFilter] = useState<string>(localStorage.getItem("filter") || 'ASC'); // Recupera el filtro de localStorage o usa el valor predeterminado
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || ''); // Recupera el término de búsqueda de localStorage o usa una cadena vacía
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  // const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSession = JSON.parse(
        localStorage.getItem("userSession") || "null"
      );
      setUserSession(storedSession);
    }

    const storedToken = localStorage.getItem("userSession");
  
    // Si no se encuentra el token, redirigimos al login
    if (!storedToken) {
      router.push('/login');
    } else {
      setTOKEN(JSON.parse(storedToken));
    }
  }, [router]);
  
  const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    localStorage.setItem("filter", newFilter);
  };
  const HandleSearch = (e: any) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    localStorage.setItem("searchTerm", newSearchTerm);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Si `filter` es numérico, lo interpretamos como una calificación.
        const order = filter === 'ASC' || filter === 'DESC' ? filter : 'ASC';
        const calification = isNaN(Number(filter)) ? undefined : Number(filter);
       
        const name = searchTerm;
        const token = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userSession") || "{}").token : null;
      const gardeners = await getGardenersDB(token, order, calification, name);
      setProviders(gardeners.data); // SACO .data PARA VER DE RESOLVER EL DEPLOY
        console.log(gardeners);


      } catch (error : any) {
        setError(error.message || 'Error al cargar los productos');
      }
    };
    
    
  
    console.log(fetchProviders());
  }, [filter, searchTerm]); // Vuelve a cargar cada vez que cambia el filtro


  if (error) return <div>{error}</div>;

  return (

    <div className="mx-auto mt-24">
      {
        !providers ? (
          <div className="text-center mb-8 mx-auto">
            <h1 className="text-2xl font-bold mb-4">No hay jardineros</h1>
            <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded' onClick={() => setSearchTerm('')}>Back</button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 mx-auto">
              <div className="relative w-1/2 mx-auto flex items-center mb-8">
                <input
                  type="text"
                  placeholder="Buscar jardinero..."
                  value={searchTerm}
                  onChange={HandleSearch}
                  className="w-full pl-4 pr-12 py-2 text-lg rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <FaSearch className="absolute right-4 text-gray-500" />
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <select
                className="border rounded p-2"
                value={filter}
                onChange={handleFilter}
              >
                <option value="">Ordenar por</option>
                <option value="ASC">Alfabetico ⬆</option>
                <option value="DESC">Alfabetico ⬇</option>
                <option value="1"> ⭐</option>
                <option value="2"> ⭐⭐</option>
                <option value="3"> ⭐⭐⭐</option>
                <option value="4"> ⭐⭐⭐⭐</option>
                <option value="5"> ⭐⭐⭐⭐⭐</option>
              </select>
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
          </>
        )
      }
    </div>
  );
};

export default ProviderCardList;