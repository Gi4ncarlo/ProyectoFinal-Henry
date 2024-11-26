"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProviderCard from "../ProviderCard/ProviderCard";
import { IServiceProvider } from "@/interfaces/IServiceProvider";
import { getGardenersDB } from "@/helpers/gardeners.helpers";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Dropdown: React.FC<{ filter: string; onChange: (value: string) => void }> = ({
  filter,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "ASC", label: "A-Z" },
    { value: "DESC", label: "Z-A" },
    { value: "1", label: "⭐" },
    { value: "2", label: "⭐⭐" },
    { value: "3", label: "⭐⭐⭐" },
    { value: "4", label: "⭐⭐⭐⭐" },
    { value: "5", label: "⭐⭐⭐⭐⭐" },
    { value: "AVAILABLE", label: "Disponibles" },
    { value: "NOT_AVAILABLE", label: "No disponibles" },
  ];

  return (
    <div className="relative w-48">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {options.find((opt) => opt.value === filter)?.label || "Ordenar por"}
        <span className="float-right">▼</span>
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 hover:bg-[#8BC34A] hover:text-white cursor-pointer text-center ${
                filter === option.value ? "bg-green-100" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ListGardeners: React.FC = () => {
  const [providers, setProviders] = useState<IServiceProvider[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [TOKEN, setTOKEN] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ASC");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1); // Estado para manejar la página actual
  const itemsPerPage = 8; // Límite de cards por página
  const [availability, setAvailability] = useState<string | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSession = localStorage.getItem("userSession");
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        setTOKEN(parsedSession.token);
      } else {
        router.push("/login");
      }

      setFilter(localStorage.getItem("filter") || "ASC");
      setSearchTerm(localStorage.getItem("searchTerm") || "");
    }
  }, [router]);

  const handleFilter = (newFilter: string) => {
    setFilter(newFilter);
  
    if (newFilter === "AVAILABLE") {
      setAvailability("true"); // Filtrar por disponibles
    } else if (newFilter === "NOT_AVAILABLE") {
      setAvailability("false"); // Filtrar por no disponibles
    } else {
      setAvailability(undefined); // No filtrar por disponibilidad
    }
  
    if (typeof window !== "undefined") {
      localStorage.setItem("filter", newFilter);
    }
  };
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (typeof window !== "undefined") {
      localStorage.setItem("searchTerm", newSearchTerm);
    }
  };

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const order = filter === "ASC" || filter === "DESC" ? filter : "ASC";
        const calification = isNaN(Number(filter)) ? undefined : Number(filter);
        let availability: string | undefined = undefined;

         // Si el filtro es por disponibilidad, lo ajustamos
      if (filter === "AVAILABLE") {
        availability = "true";  // Aquí asumo que tienes un campo booleano o similar para la disponibilidad.
      }
        const token =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("userSession") || "{}").token
            : null;

        const gardeners = await getGardenersDB(token, order, calification, searchTerm,availability);
        setProviders(gardeners.data || []);
      } catch (error: any) {
        setError(error.message || "Error al cargar los Jardineros");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [filter, searchTerm]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const paginatedProviders = providers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <div className="container min-h-screen px-6 py-12 mx-auto">
        <h1 className="text-2xl text-center mt-24 bold text-[#FF5722]">
          Cargando ...
        </h1>
      </div>
    );
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
            <Dropdown filter={filter} onChange={handleFilter} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
            {paginatedProviders.map((gardener) => (
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
          <div className="flex justify-between mt-6 mb-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-[#8BC34A] text-white rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Página anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage * itemsPerPage >= providers.length}
                className={`px-4 py-2 bg-[#8BC34A] text-white rounded ${
                  currentPage * itemsPerPage >= providers.length
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
              Página siguiente
            </button>
        </div>
        </>
      )}
    </div>
  );
};





export default ListGardeners