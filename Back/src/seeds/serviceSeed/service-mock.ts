import { Categories } from "src/modules/serviceProvided/enums/categories.enum";

export const serviceMock = [
    {
  
        categories: [Categories.GROWER],
        detailService: "Servicio de Jardinería completa, limpieza incluida en el servicio.",
        price: 30000,
        gardener: null, // Puedes dejarlo como `null` o agregar una referencia si es necesario
        serviceOrders: null, // Si se requieren otros campos, agrégalos aquí
    },
    {

        categories: [Categories.PLANT_SPECIALIST],
        detailService: "Servicio de Plantación, distintos tipos de semillas",
        price: 90000,
        gardener: null,
        serviceOrders: null,
    },
    {
     
        categories: [Categories.IRRIGATION_INSTALLER],
        detailService: "Servicio de instalación de irrigación, tuberías subterráneas.",
        price: 65000,
        gardener: null,
        serviceOrders: null,
    },
];
