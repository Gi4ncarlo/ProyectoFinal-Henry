import { Categories } from "src/modules/serviceProvided/enums/categories.enum";

export const serviceMock = [
    {
        categories: [Categories.GROWER],
        detailService: "Servicio completo de jardinería, limpieza incluida en el servicio.",
        price: 30000,
        gardener: null, // Puedes dejarlo como `null` o agregar una referencia si es necesario
        serviceOrders: null, // Si se requieren otros campos, agrégalos aquí
    },
    {

        categories: [Categories.LAWN_CARE],
        detailService: "Servicio de Plantación, diferentes tipos de semillas.",
        price: 90000,
        gardener: null,
        serviceOrders: null,
    },
    {
     
        categories: [Categories.IRRIGATION],
        detailService: "Servicio de instalación de riego, tuberías subterráneas.",
        price: 65000,
        gardener: null,
        serviceOrders: null,
    },
];
