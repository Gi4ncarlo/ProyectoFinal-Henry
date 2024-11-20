"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProviderCard from "../ProviderCard/ProviderCard";
import { IServiceProvider } from "@/interfaces/IServiceProvider";
import { getGardenersDB } from "@/helpers/gardeners.helpers";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { IUserSession } from "@/interfaces/IUserSession";

const ProviderCardList: React.FC = () => {
  const [providers, setProviders] = useState<IServiceProvider[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [TOKEN, setTOKEN] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ASC");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userSession, setUserSession] = useState<IUserSession | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Ejecutar solo en el navegador
    if (typeof window !== "undefined") {
      const storedSession = localStorage.getItem("userSession");
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        setUserSession(parsedSession);
        setTOKEN(parsedSession.token);
      } else {
        router.push("/login");
      }

      // Recuperar filtro y término de búsqueda de localStorage
      setFilter(localStorage.getItem("filter") || "ASC");
      setSearchTerm(localStorage.getItem("searchTerm") || "");
    }
  }, [router]);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);

    // Guardar el filtro en localStorage (solo navegador)
    if (typeof window !== "undefined") {
      localStorage.setItem("filter", newFilter);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Guardar el término de búsqueda en localStorage (solo navegador)
    if (typeof window !== "undefined") {
      localStorage.setItem("searchTerm", newSearchTerm);
    }
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const order = filter === "ASC" || filter === "DESC" ? filter : "ASC";
        const calification = isNaN(Number(filter)) ? undefined : Number(filter);

        const token =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("userSession") || "{}").token
            : null;

        const gardeners = await getGardenersDB(token, order, calification, searchTerm);
        setProviders(gardeners.data || []);
      } catch (error: any) {
        setError(error.message || "Error al cargar los productos");
      }
    };

    fetchProviders();
  }, [filter, searchTerm]);

  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto mt-24">
      {providers.length === 0 ? (
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
                onChange={handleSearch}
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
      )}
    </div>
  );
};

export default ProviderCardList;
