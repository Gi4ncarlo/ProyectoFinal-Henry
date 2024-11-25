const Modal = ({ show, onClose, orderDetail }: any) => {
    if (!show || !orderDetail) return null; // Asegurarse de que se muestre solo cuando la orden esté seleccionada
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-[80vw] h-[70vh] overflow-y-scroll">
                <h1 className="text-3xl font-bold text-center mt-4">Detalles de la compra</h1>
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Nº de recibo:</strong> <h6 className="text-sm font-medium text-gray-900">{orderDetail.id}</h6></p>
                    <p><strong>Fecha de trabajo:</strong> {orderDetail.startTime}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 py-5">
                    <p><strong>Precio total Pagado: $</strong> {orderDetail.totalPrice}</p>
                </div>
                <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
                    <label htmlFor="token" className="block text-sm font-medium mb-2">
                        Your Token
                    </label>
                    <input
                        type="text"
                        id="token"
                        value={orderDetail.userToken}
                        readOnly
                        className="w-full bg-gray-700 text-center text-gray-200 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                        Puedes seleccionar y copiar el token.
                    </p>
                </div>


                {/* <p><strong>Nº de recibo:</strong> {orderDetail.id}</p>

                <p><strong>Servicio:</strong> {orderDetail.usetToken}</p>
                <p><strong>Detalles:</strong> {orderDetail.id}</p>
                <p><strong>Fecha y Hora:</strong> {orderDetail.id} a las {orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>

                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p> */}

                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-md">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;