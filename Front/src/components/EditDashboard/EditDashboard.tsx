
"use client";
import { postCarrouselImage, getCarrouselById } from "@/helpers/gardeners.helpers";
import { userEdit } from "@/helpers/userEdit.helpers";
import { IUserSession } from "@/interfaces/IUserSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditDashboard: React.FC = () => {
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const [imageProfile, setImageProfile] = useState<string | null>(null);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');
    const [carrousel, setCarrousel] = useState<string[]>([]);
    const TOKEN = userSession?.token || '';

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedSession = localStorage.getItem("userSession");
            if (storedSession) {
                const parsedSession: IUserSession = JSON.parse(storedSession);
                setUserSession(parsedSession);
                setImageProfile(parsedSession?.user?.profileImageUrl || null);
            }
        }
    }, []);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
                            Authorization: `Bearer ${TOKEN}`,
                        },
                        body: formData,
                    }
                );

                if (!response.ok) throw new Error("Error uploading image");

                const data = await response.json();

                if (userSession) {
                    const updatedSession = { ...userSession, user: { ...userSession.user, profileImageUrl: data.imageUrl } };
                    localStorage.setItem("userSession", JSON.stringify(updatedSession));
                    setUserSession(updatedSession);
                    setImageProfile(data.imageUrl);
                }
                Swal.fire("Éxito", "Imagen subida correctamente", "success");
            } catch (error) {
                console.error("Error uploading image:", error);
                Swal.fire("Error", "No se pudo subir la imagen", "error");
            }
        }
    };

    const handleEditClick = (field: string, currentValue: string) => {
        setEditingField(field);
        setEditedValue(currentValue);
    };

    const handleSaveClick = async () => {
        if (editingField && userSession) {
            const updatedData = { [editingField]: editedValue };

            try {
                const updatedUser = await userEdit(updatedData);

                if (updatedUser) {
                    const updatedSession = { ...userSession, user: updatedUser };
                    localStorage.setItem("userSession", JSON.stringify(updatedSession));
                    setUserSession(updatedSession);
                    setEditingField(null);
                    setEditedValue('');
                    Swal.fire("Éxito", "Cambios guardados correctamente", "success");
                }
            } catch (error) {
                console.error("Error saving changes:", error);
                Swal.fire("Error", "Hubo un problema al guardar los cambios", "error");
            }
        }
    };

    const handleCancelClick = () => {
        setEditingField(null);
        setEditedValue('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Datos de tu cuenta</h1>

            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-10">
                {/* Imagen de perfil */}
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Opciones de perfil</h2>
                    <div className="mb-6">
                        <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            Sube una imagen de perfil
                        </label>
                        <input
                            id="profileImageUrl"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        {imageProfile ? (
                            <Image
                                src={imageProfile}
                                alt="Profile"
                                className="rounded-full border-2 border-gray-200 shadow-md"
                                width={150}
                                height={150}
                            />
                        ) : (
                            <h1 className="text-gray-500 text-sm">SIN IMAGEN</h1>
                        )}
                    </div>
                </div>

                {/* Campos de edición */}
                <div>
                    {[
                        { label: "Nombre de usuario", field: "name", value: userSession?.user.name || "" },
                        { label: "Edad", field: "age", value: userSession?.user.age || "N/A" },
                        { label: "Teléfono", field: "phone", value: userSession?.user.phone || "" },
                        { label: "Dirección", field: "address", value: userSession?.user.address || "" },
                    ].map(({ label, field, value }) => (
                        <div key={field} className="border p-4 mb-4 rounded">


                            {/* Muestra el campo y el botón de edición */}
                            <p className="mb-2">
                                <strong>{label}:</strong> {value}
                            </p>
                            <button
                                onClick={() => handleEditClick(field, value)}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                            >
                                Editar
                            </button>

                            {/* Si el campo está en edición, muestra el input de edición debajo */}
                            {editingField === field && (
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={editedValue}
                                        onChange={(e) => setEditedValue(e.target.value)}
                                        className="p-2 border border-gray-300 rounded w-full"
                                    />
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            onClick={handleSaveClick}
                                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancelClick}
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EditDashboard;
