"use client";
import {
  getCarrouselById,
  postCarrouselImage,
  updateCarrousel,
} from "@/helpers/gardeners.helpers";
import { IUserSession } from "@/interfaces/IUserSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Upload, Button, Carousel } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const CarrouselGardener = () => {
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [carrousel, setCarrousel] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedSession = JSON.parse(localStorage.getItem("userSession") || "");
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
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gardener");

    try {
      const response = await postCarrouselImage(
        formData,
        userSession?.user.id.toString()
      );

      if (response?.imageUrl) {
        setCarrousel((prevCarrousel) => [...prevCarrousel, response.imageUrl]);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Imagen subida correctamente",
        });

        const id = userSession?.user.id.toString();
        if (id) {
          await updateCarrousel(id, [...carrousel, response.imageUrl]);
        }
      } else {
        throw new Error("No se obtuvo la URL de la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al subir la imagen.",
      });
    }
  };

  const handleUpload = ({ file }: { file: any }) => {
    const convertedFile = file.originFileObj as File || file as File;
    uploadImage(convertedFile);
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

  if (loader) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="w-16 h-16 border-4 border-green-300 border-t-green-500 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold text-[#263238]">
          Cargando la información...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Carrusel de imágenes:
        </h2>

        {/* Carrusel con Ant Design */}
        <div className="carousel-container my-6">
          <Carousel autoplay effect="fade" arrows>
            {carrousel.map((imageUrl, index) => (
              <div
                key={index}
                className="w-full max-h-96 flex justify-center items-center overflow-hidden rounded-lg border-2 border-[#4CAF50]"
              >
                <Image
                  src={imageUrl}
                  alt={`Imagen ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="object-cover"
                />
                <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    X
                  </button>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#388E3C] mb-4">
          Subir imagen al carrusel:
        </h2>
        <Upload
          customRequest={({ file }) => handleUpload({ file })}
          showUploadList={false}
        >
          <Button
            style={{
              backgroundColor: "#4CAF50",
              borderColor: "#263238",
              color: "white",
            }}
            icon={<UploadOutlined />}
          >
            Sube tu imagen
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default CarrouselGardener;
