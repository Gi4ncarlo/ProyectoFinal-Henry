"use client"
import React, { useState } from "react";
import { updateGardener } from "@/helpers/gardeners.helpers";
import { IServiceProvider } from "@/interfaces/IServiceProvider";

interface EditGardenerFormProps {
  gardener: IServiceProvider;
  onSave: (updatedGardener: IServiceProvider) => void;
  onCancel: () => void;
}

const EditGardenerForm: React.FC<EditGardenerFormProps> = ({ gardener, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<IServiceProvider>>({
    name: gardener.name,
    experience: gardener.experience,
    calification: gardener.calification,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("userSession") || "{}").token
          : null;

      if (!token) {
        throw new Error("Usuario no autenticado");
      }

      const updatedGardener = await updateGardener(token, gardener.id, formData);
      onSave(updatedGardener);
    } catch (error: any) {
      alert(error.message || "Error al actualizar el jardinero.");
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Nombre"
      />
      <input
        type="text"
        name="experience"
        value={formData.experience || ""}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Experiencia"
      />
      <input
        type="number"
        name="calification"
        value={formData.calification || ""}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Calificación"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditGardenerForm;
