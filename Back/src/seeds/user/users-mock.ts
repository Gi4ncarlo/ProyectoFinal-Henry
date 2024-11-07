import { Role } from "src/modules/user/enums/role.enum";


export const usersMock = [
    {
        name: "Administrador",
        email: "admin@gmail.com",
        username : "Leonidas",
        password: "123456",
        passwordConfirm: "123456",
        phone: "5566443",
        address: "La administradora 123",
        age : 22,
        role : Role.Admin,
    },
    {
        name: "Pepe",
        email: "jardinero@gmail.com",
        username : "Pepito",
        password: "123456",
        passwordConfirm: "123456",
        phone: "51231532",
        address: "9 de Julio",
        age : 45,
        role : Role.Gardener,
    },
    {
        name: "Martina",
        email: "martina@gmail.com",
        username : "LaMarti",
        password: "123456",
        passwordConfirm: "123456",
        phone: "55325467",
        address: "Giulio di cesare",
        age : 19,
        role : Role.User,
    },
]