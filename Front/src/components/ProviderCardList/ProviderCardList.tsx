"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProviderCard from "../ProviderCard/ProviderCard";
import { IServiceProvider } from "@/interfaces/IServiceProvider";
import { getGardenersDB } from "@/helpers/gardeners.helpers";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const ProviderCardList: React.FC = () => {
  const [providers, setProviders] = useState<IServiceProvider[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ASC"); // Default order filter
  const [searchTerm, setSearchTerm] = useState("");
  const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");
  const router = useRouter();
  if (!TOKEN) {
    router.push("/login");
  }

  const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const HandleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchProviders = async (name = "") => {
      try {
        // Si `filter` es numérico, lo interpretamos como una calificación.
        const order = filter === "ASC" || filter === "DESC" ? filter : "ASC";
        const calification = isNaN(Number(filter)) ? undefined : Number(filter);
        const name = searchTerm;
        const gardeners = await getGardenersDB(order, calification, name);
        setProviders(gardeners.data);
      } catch (error: any) {
        setError(error.message || "Error al cargar los productos");
      }
    };
    fetchProviders();
  }, [filter, searchTerm]); // Vuelve a cargar cada vez que cambia el filtro

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-cover bg-fixed bg-center w-full" style={{ backgroundImage: 'url("./images/fondoJardineros2.jpg")' }}>
    <div className="flex m-auto">
    <div className="mx-auto mb-10 mt-24">
      {!providers ? (
        <div className="text-center mb-8 mx-auto">
          <h1 className="text-2xl font-bold mb-4">No hay jardineros</h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSearchTerm("")}
          >
            Back
          </button>
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
              className="border rounded p-2 bg-white text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              value={filter}
              onChange={handleFilter}
            >
              <option value="">Ordenar por</option>
              <option value="ASC">Alfabetico A-Z</option>
              <option value="DESC">Alfabetico Z-A</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
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
      )}
    </div>
    </div>
    </div>
  );
};

export default ProviderCardList;
