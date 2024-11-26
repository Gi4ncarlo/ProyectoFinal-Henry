import React, { useState } from "react";

interface ModalDetailsProps {
    order: any;
    onClose: () => void;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ order, onClose }) => {
    const [token, setToken] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    };

    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="relative bg-gradient-to-br from-white to-gray-100 p-8 rounded-3xl shadow-2xl w-full max-w-lg">
                {/* Botón de cierre */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Encabezado */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Detalles de la solicitud
                </h2>

                {/* Información del pedido */}
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-inner space-y-3">
                    <p className="text-sm text-gray-700">
                        <strong>Fecha del servicio:</strong>{" "}
                        {order.orderDetail.startTime.toLocaleString("es-ES").split(",")[0]}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Precio:</strong> ${order.orderDetail.totalPrice}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Estado:</strong> {order.isApproved ? "Aprobada" : "Pendiente"}
                    </p>
                </div>

                {/* Información del cliente */}
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-blue-50 shadow-inner space-y-3">
                    <h3 className="text-lg font-semibold text-blue-700">Datos del cliente</h3>
                    <p className="text-sm text-gray-700">
                        <strong>Nombre:</strong> {order.user.name}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Email:</strong> {order.user.email}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Teléfono:</strong> {order.user.phone}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Dirección:</strong> {order.user.address || "No proporcionada"}
                    </p>
                </div>

                {/* Campo de entrada del token */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="token">
                        Ingrese un token
                    </label>
                    <input
                        type="text"
                        id="token"
                        maxLength={6}
                        value={token}
                        onChange={handleInputChange}
                        placeholder="Escriba el token aquí"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* Botón de acción */}
                <button
                    onClick={() => console.log("Token ingresado:", token)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default ModalDetails;