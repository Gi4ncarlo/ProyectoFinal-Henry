import { ILoginProps } from "@/interfaces/ILoginProps";
import { IRegisterProps } from "@/interfaces/IRegisterProps";



const APIURL = process.env.NEXT_PUBLIC_API_URL


export async function register(dataUser: IRegisterProps): Promise<void>  {
    try {
        const res = await fetch(`${APIURL}/signup`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataUser),
            mode: 'no-cors'
        })
        console.log("resp",res);
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Register error');
        }
    } catch (error: any) {
        console.log("error",error);
        
        throw new Error(error)
    }

}



export async function login(dataUser: ILoginProps) {
    try {
        const res = await fetch(`${APIURL}/signin`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataUser)
        })
        const response = await res.json(); //se trae solo la parte necesaria de todo el json 
        return response;
    } catch (error: any) {
        throw new Error(error)
    };
}
