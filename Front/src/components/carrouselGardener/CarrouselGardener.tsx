"use client";
import { getCarrouselById, postCarrouselImage } from "@/helpers/gardeners.helpers";
import { IUserSession } from "@/interfaces/IUserSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


const CarrouselGardener= () => {
  const [activeComponent, setActiveComponent] = useState<string>(""); // Controla el componente activo
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [carrousel, setCarrousel] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedSession = JSON.parse(
        localStorage.getItem("userSession") || ""
      );
      setUserSession(storedSession);
    }
  }, []);

  const fetchCarrousel = async () => {
    try {
      const id = userSession?.user.id.toString();
      if (id) {
        const carrouselData = await getCarrouselById(id);
        setCarrousel(carrouselData?.imageUrl || []);
      }
    } catch (error) {
      console.error("Error buscando el carrousel:", error);
    }
  };
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gardener");
  
    try {
      const response = await postCarrouselImage(formData, userSession?.user.id.toString());
      console.log(response);
      if (response) {
        fetchCarrousel(); 
        Swal.fire({
          icon: "success",
          title: " Éxito",
          text: "Imagen subida correctamente", })
      }
      
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

  console.log(carrousel);

    return (
      <div className="min-h-screen bg-[#F4F9F4] font-sans">
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-[#388E3C] mb-4">
                  Carrusel de imágenes:
                </h2>
                <div className="relative w-full max-w-3xl mx-auto">
                  <div className="overflow-hidden rounded-lg shadow-lg bg-white">
                    <div className="flex snap-x snap-mandatory overflow-x-auto">
                      {carrousel?.map((image: string, index: number) => (
                        <div
                          key={index}
                          className="snap-center flex-none w-full"
                          style={{ maxWidth: "400px" }}
                        >
                          <Image
                            src={image}
                            alt={`Imagen ${index + 1}`}
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover rounded-lg"
                          />
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
                  className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white"
                />
              </div>

      </div>
    );
  };


export default CarrouselGardener;



