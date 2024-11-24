const Modal = ({ show, onClose, orderDetail } : any) => {
    if (!show || !orderDetail) return null; // Asegurarse de que se muestre solo cuando la orden esté seleccionada

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[60vw] h-[70vh] overflow-y-scroll">
                <h4 className="text-2xl font-semibold mb-4">Detalles de la Orden</h4>
                <p><strong>Nº de recibo:</strong> {orderDetail.id}</p>

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
                <p><strong>Monto Pagado:</strong> ${orderDetail.id}</p>

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