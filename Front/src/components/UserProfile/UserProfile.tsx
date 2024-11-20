"use client";
import { IUserSession } from "@/interfaces/IUserSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Componente para mostrar las órdenes del usuario
const DashboardUserCompo: React.FC = () => {
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");
    const [imageProfile, setImageProfile] = useState<string | null>(null);

    useEffect(() => {
        // Asegurarse de que la sesión se cargue solo una vez al inicio
        if (typeof window !== "undefined") {
            const storedSession = JSON.parse(
                localStorage.getItem("userSession") || "null"
            );
            setUserSession(storedSession);
            if (storedSession?.user?.profileImageUrl) {
                setImageProfile(storedSession.user.profileImageUrl);
            }
        }
    }, []);

    // Manejo de la subida de la imagen
    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/${userSession?.user.role}/${userSession?.user?.id}/image`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${TOKEN.token}`,
                        },
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error("Error uploading image");
                }

                const data = await response.json();

                // Actualiza la imagen en el estado y en el localStorage
                if (userSession && userSession.user) {
                    const updatedSession = { ...userSession };
                    updatedSession.user.profileImageUrl = data.imageUrl;
                
                    // Guardar la sesión actualizada en el localStorage
                    localStorage.setItem("userSession", JSON.stringify(updatedSession));
                    setImageProfile(data.imageUrl); // Actualiza el estado inmediatamente
                }
                Swal.fire("Éxito", "Imagen subida correctamente", "success");
            } catch (error) {
                Swal.fire("Error", "No se pudo subir la imagen", "error");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-3 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Bienvenido a su historial de Operaciones
            </h1>

            <div className="w-full max-w-6xl space-y-8">
                <h1 className="text-xl font-bold text-gray-800 mb-8">
                    Opciones de perfil :
                </h1>
                <div>
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Subi un Imagen de Perfil
                    </label>
                    <input
                        id="profileImageUrl"
                        name="profileImageUrl"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <div className="flex items-center justify-center">
                    {imageProfile ? (
                        <Image
                            src={imageProfile || ""}
                            alt="Profile"
                            className="rounded-full"
                            width={200}
                            height={200}
                        />
                    ) : (
                        <h1>SIN IMAGEN</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardUserCompo;
