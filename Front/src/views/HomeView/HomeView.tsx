"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (selectedCategory) {
      router.push(`/${selectedCategory}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-green-800 mb-8">¡Bienvenido a Vicnasol!</h1>

      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full mb-12">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
            aria-label="Select a gardening service"
          >
            <option value="">Seleccione un servicio</option>
            <option value="all-services">All Services</option>
            <option value="lawn-mowing">Lawn Mowing</option>
            <option value="tree-pruning">Tree Pruning</option>
            <option value="hedge-trimming">Hedge Trimming</option>
            <option value="garden-design">Garden Design</option>
            <option value="lawn-fertilization">Lawn Fertilization</option>
            <option value="weed-control">Weed Control</option>
            <option value="mulching">Mulching</option>
            <option value="irrigation">Irrigation System Installation</option>
            <option value="landscape-maintenance">Landscape Maintenance</option>
            <option value="leaf-removal">Leaf Removal</option>
            <option value="flower-bed-planting">Flower Bed Planting</option>
            <option value="soil-aeration">Soil Aeration</option>
            <option value="garden-pest-control">Garden Pest Control</option>
            <option value="gutter-cleaning">Gutter Cleaning</option>
            <option value="tree-removal">Tree Removal</option>
          </select>

          <button
            onClick={handleSearch}
            className={`w-full sm:w-auto px-6 py-3 rounded-md text-white font-semibold transition duration-200 ease-in-out ${selectedCategory
                ? 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
            disabled={!selectedCategory}
            aria-label="Search for selected service"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Buscar
          </button>
        </div>
      </div>

      <div className="mt-12 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Descubra el placer de la jardinería</h2>
        <p className="text-green-700">
          Si usted es un jardinero experimentado, recién comienza o busca contratar servicios profesionales,
           tenemos todo lo que necesita para ayudar a que su jardín y su negocio florezcan. Explora nuestra extensa 
           gama de servicios, herramientas y asesoramiento experto para crear el espacio exterior perfecto.
        </p>
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="w-32 h-32 bg-green-300 rounded-full opacity-50"></div>
      </div>
      <div className="absolute top-4 right-4">
        <div className="w-32 h-32 bg-green-300 rounded-full opacity-50"></div>
      </div>
    </main>
  );
};

export default Home;