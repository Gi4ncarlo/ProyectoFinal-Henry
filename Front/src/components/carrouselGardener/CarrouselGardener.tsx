"use client";
import {
  getCarrouselById,
  postCarrouselImage,
  updateCarrousel,
} from "@/helpers/gardeners.helpers";
import { IUserSession } from "@/interfaces/IUserSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CarrouselGardener = () => {
  const [activeComponent, setActiveComponent] = useState<string>(""); // Controla el componente activo
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [carrousel, setCarrousel] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedSession = JSON.parse(
        localStorage.getItem("userSession") || ""
      );
      setUserSession(storedSession);
    }
  }, []);

  const fetchCarrousel = async () => {
    setLoader(true);
    try {
      const id = userSession?.user.id.toString();
      if (id) {
        const carrouselData = await getCarrouselById(id);
        setCarrousel(carrouselData?.imageUrl || []);
        setLoader(false);
      }
    } catch (error) {
      console.error("Error buscando el carrousel:", error);
    }
  };
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    //if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gardener");

    try {
      const response = await postCarrouselImage(
        formData,
        userSession?.user.id.toString()
      );
      console.log("respuesta en uploadImage", response);
   
      //if (response) {
      await fetchCarrousel();
        Swal.fire({
          icon: "success",
          title: " Éxito",
          text: "Imagen subida correctamente",
        });
      //}
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen.");
    }
  };

  useEffect(() => {
    if (userSession?.user?.id) {
      fetchCarrousel();
    }
  }, [userSession]);

  const handleDelete = async (index: number) => {
    const updatedCarrousel = carrousel.filter((_, i) => i !== index);
    setCarrousel(updatedCarrousel);

    const id = userSession?.user.id.toString();
    if (id) {
      await updateCarrousel(id, updatedCarrousel);
    }
  };

  if(loader){
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-green-300 border-t-green-500 rounded-full animate-spin mb-4"></div>
  
      {/* Texto */}
      <h2 className="text-xl font-semibold text-[#263238]">
        Cargando la informacion..
      </h2>
    </div>
    )
  }

  return (
    <div className="">
       <div>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Carrusel de imágenes:
        </h2>
 
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="flex snap-x snap-mandatory overflow-x-auto">
              {carrousel?.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative snap-center flex-none w-full"
                  style={{ maxWidth: "400px" }}
                >
                  <Image
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subir nueva imagen */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#FF5722] mb-4">
          Subir imagen al carrusel:
        </h2>
        <input
  type="file"
  onChange={uploadImage}
  className="block  w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white"
/>

      </div>
    </div>
  );
};

export default CarrouselGardener;
