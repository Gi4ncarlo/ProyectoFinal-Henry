"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface Gardener {
  id: string;
  name: string;
  rating: number;
}

const Gardeners: React.FC = () => {
  const [gardeners, setGardeners] = useState<Gardener[]>([]);
  const searchParams = useSearchParams();
  const serviceId = searchParams ? searchParams.get('serviceId') : null;

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const response = await axios.get<Gardener[]>(`/api/gardener?serviceId=${serviceId}`);
        setGardeners(response.data);
      } catch (error) {
        console.error('Error al obtener los gardeners:', error);
      }
    };

    if (serviceId) {
      fetchGardeners();
    }
  }, [serviceId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Gardeners Offering This Service</h1>
      <ul>
        {gardeners.length > 0 ? (
          gardeners.map(gardener => (
            <li key={gardener.id} className="p-2 border-b border-gray-200">
              {gardener.name} - Rating: {gardener.rating}
            </li>
          ))
        ) : (
          <p>No gardeners found for this service.</p>
        )}
      </ul>
    </div>
  );
};

export default Gardeners;
