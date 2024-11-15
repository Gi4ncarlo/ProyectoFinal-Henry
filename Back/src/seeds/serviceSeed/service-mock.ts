import { Categories } from "src/modules/serviceProvided/enums/categories.enum";

export const serviceMock = [
    {
  
        categories: [Categories.GROWER],
        detailService: "Servicio de jardinería completo con limpieza y mantenimiento.",
        price: 30000,
        gardener: null, 
        serviceOrders: null, 
    },
    {

        categories: [Categories.LAWN_CARE],
        detailService: "servicio de plantacion de todo tipo de plantas y flores.",
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
