export const OrdersGardener = ({ order }: any) => (
    <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {order.map((order: any) => (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:rotate-2">
                    <div className="relative">
                        <img
                            src={order.user.profileImageUrl || "https://via.placeholder.com/400x250"}
                            alt="Imagen de ejemplo"
                            className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="absolute top-4 left-4 bg-white bg-opacity-70 px-3 py-1 text-gray-800 text-sm font-semibold rounded-full">
                            {order.user.name}
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">
                                <strong>Fecha del servicio:</strong> {order.date}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Precio:</strong> ${order.totalPrice}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Solicitante:</strong> {order.user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Estado de la solicitud:</strong> {order.isApproved ? "Aprobada" : "Pendiente"}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Calificación:</strong> ⭐⭐⭐⭐
                            </p>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                            Ver detalles
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
