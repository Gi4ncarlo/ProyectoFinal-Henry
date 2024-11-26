"use client";

import { useEffect, useRef } from 'react';
import Head from 'next/head';

interface GardenerMapProps {
  location: { lat: number; lng: number }; // Ubicación con latitud y longitud
}

const GardenerMap: React.FC<GardenerMapProps> = ({ location }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');

      // Inicializar el mapa solo si aún no existe
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([location.lat, location.lng], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          tileSize: 256, // Tamaño predeterminado
          zoomOffset: 0,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

              // Agregar un marcador circular con tooltip
        const circle = L.circle([location.lat, location.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 1000,
          }).addTo(mapRef.current);
    
          circle.bindTooltip('Ubicación aproximada con un radio de 1km').openTooltip();
      } else {
        // Actualizar la vista del mapa
        mapRef.current.setView([location.lat, location.lng], 13);
      }

      
    }

    // Limpiar el mapa al desmontar el componente
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [location]);

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>
      <h1>Ubicación aproximada</h1>
      <div
        className=".fixed position-relative overflow-hidden border-2"
        id="map"
        style={{ height: '300px', width: '100%' }}
      ></div>
    </div>
  );
};

export default GardenerMap;
