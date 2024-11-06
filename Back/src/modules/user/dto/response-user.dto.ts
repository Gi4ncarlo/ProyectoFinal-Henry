export class UserResponseDto{

    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    age: number;

    constructor(partial: Partial<UserResponseDto>){
        const { id, name, email, age, phone, username } = partial;
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.phone = phone;
        this.age = age;
    }

}