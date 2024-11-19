import { ILoginProps } from "@/interfaces/ILoginProps";
import { IRegisterProps } from "@/interfaces/IRegisterProps";
import { IServiceProps } from "@/interfaces/IServiceProps";

const APIURL = process.env.NEXT_PUBLIC_API_URL;
<<<<<<< HEAD

=======
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");
>>>>>>> 3eb31b2ff372808ecb0a7bab2fc2b36e68defe42
export async function register(dataUser: IRegisterProps): Promise<void> {
  try {
    const res = await fetch(`${APIURL}/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(dataUser),
    });

    // if (!res.ok) {
    //   const errorData = await res.json();
    //   if (errorData.message.includes("email")) {
    //     throw new Error("Este correo ya está registrado.");
    //   }
    //   throw new Error(errorData.message || "Register error");
    // }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function login(dataUser: ILoginProps) {
  try {
    const res = await fetch(`${APIURL}/auth/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(dataUser),
    });
    const response = await res.json(); //se trae solo la parte necesaria de todo el json
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function registerService(dataService: IServiceProps): Promise<void> {
  try {
    // Asegurarse de que estamos en el cliente y accediendo a localStorage
    if (typeof window === "undefined") {
      throw new Error("Cannot access localStorage on the server side.");
    }

    const storedToken = localStorage.getItem("userSession");
    const TOKEN = storedToken ? JSON.parse(storedToken) : null;

    // Verificamos que el token esté presente
    if (!TOKEN || !TOKEN.token) {
      throw new Error("Token is missing or invalid.");
    }
<<<<<<< HEAD

    console.log("DATA SERVICE:", dataService);

=======
>>>>>>> 3eb31b2ff372808ecb0a7bab2fc2b36e68defe42
    const res = await fetch(`${APIURL}/serviceProvided`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataService),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Service registration error");
    }
  } catch (error: any) {
    console.error("Error during service registration:", error);
    throw new Error(error.message || "Unknown error");
  }
}


export async function checkEmailBeforeRegister(dataUser: IRegisterProps): Promise<boolean> {
  try {
    const res = await fetch(`${APIURL}/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...dataUser }), 
    });

    return res.ok; // Retorna `true` si no hay error
  } catch (error: any) {
    if (error.message.includes("email")) {
      return false; // Si el email ya existe
    }
    throw error; // Otros errores
  }
}
