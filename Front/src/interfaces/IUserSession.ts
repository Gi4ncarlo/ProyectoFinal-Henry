export interface IUserSession { 
    token: string;
    user: {
        address: string;
        email:string,
        id:number,
        isGoogle: boolean,
        name:string,
        phone:string, 
         role:string,
         profileImageUrl?:string,
         orders: []
    }
}