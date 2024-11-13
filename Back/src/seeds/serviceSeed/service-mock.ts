import { Categories } from "src/modules/serviceProvided/enums/categories.enum";

export const serviceMock = [
    {
        categories: [Categories.GROWER],
        detailService: "Complete gardening service, cleaning included in the service.",
        price: 30000,
        gardener: null, // Puedes dejarlo como `null` o agregar una referencia si es necesario
        serviceOrders: null, // Si se requieren otros campos, agrégalos aquí
    },
    {

        categories: [Categories.LAWN_CARE],
        detailService: "Plantation Service, different types of seeds",
        price: 90000,
        gardener: null,
        serviceOrders: null,
    },
    {
     
        categories: [Categories.IRRIGATION],
        detailService: "Irrigation installation service, underground pipes.",
        price: 65000,
        gardener: null,
        serviceOrders: null,
    },
];
