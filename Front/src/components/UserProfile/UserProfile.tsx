"use client";
import { IUserSession } from "@/interfaces/IUserSession";
import Image from "next/image";
// import { format } from 'date-fns';
// import { es, ar } from 'date-fns/locale';
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Componente para mostrar las órdenes del usuario
const DashboardUserCompo: React.FC = () => {
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");
    const [imageProfile, setImageProfile] = useState<any>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedSession = JSON.parse(
                localStorage.getItem("userSession") || "null"
            );
            setUserSession(storedSession);
        }
    }, []);

    //SUBIDA DE IMAGEN
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

                console.log("data de la imagen", data);
                const sesion = JSON.parse(
                    localStorage.getItem("userSession") || "null"
                );

                sesion.user.profileImageUrl = data.imageUrl;

                console.log("sesion:", sesion);
                localStorage.clear();
                localStorage.setItem("userSession", JSON.stringify(sesion));

                Swal.fire("Éxito", "Imagen subida correctamente", "success");
                buscarImagen();
            } catch (error) {
                Swal.fire("Error", "No se pudo subir la imagen", "error");
            }
        }
    };

    //BUSCAR IMAGEN
    const buscarImagen = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${userSession?.user?.id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN.token}`,
                },
            }
        );
        const user = await response.json();
        setImageProfile(user.profileImageUrl);
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
                    {userSession?.user.profileImageUrl ? (
                        <Image
                            src={userSession?.user?.profileImageUrl || ""}
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
