import { Categories } from "src/modules/serviceProvided/enums/categories.enum"


export const serviceMock = [
    {
        categories: [Categories.GROWER],
        detailService : "Servicio de Jardineria completa, limpieza incluida en el servicio.",
        price : 30000,
    },
    {
        categories: [Categories.PLANT_SPECIALIST],
        detailService : "Servicio de Plantacion, distintos tipos de semillas",
        price : 90000,
    },
    {
        categories: [Categories.IRRIGATION_INSTALLER],
        detailService : "Servicio de instalacion de irrigacion, tuberias subterraneas.",
        price : 65000,
    },
]