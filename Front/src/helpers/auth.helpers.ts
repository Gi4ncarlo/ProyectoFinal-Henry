import { ILoginProps } from "@/interfaces/ILoginProps";
import { IRegisterProps } from "@/interfaces/IRegisterProps";
import { IServiceProps } from "@/interfaces/IServiceProps";

const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");
console.log("Token recuperado:", TOKEN);

export async function register(dataUser: IRegisterProps): Promise<void> {
  try {
    const res = await fetch(`${APIURL}/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(dataUser),
    });
    console.log("resp", res);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Register error");
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error);
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

export async function registerService(
  dataService: IServiceProps
): Promise<void> {
  try {
    if (!TOKEN.token) {
      throw new Error("Token is missing or invalid.");
    }

    console.log("DATA SERVICE : ", dataService);
    

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
