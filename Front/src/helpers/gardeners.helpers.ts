import { IServiceProvider } from "@/interfaces/IServiceProvider";

const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")

export async function getGardenersDB(name?:string): Promise<IServiceProvider[]> {
  try {

    console.log("gardHelp TOKEN : ", TOKEN.token);
    
    const res = await fetch(`${APIURL}/gardener/?name=${name || ""}`, {
      method: 'GET', 
      headers: {
      'Authorization': `Bearer ${TOKEN.token}`,
      'Content-Type': 'application/json', 
    },
      next: { revalidate: 1200 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch gardeners");
    }

    const response = await res.json();
    console.log(response);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("Invalid data format, expected an array in 'data'");
    }
  } catch (error: any) {
    console.error("Error fetching gardeners:", error);
    return [];
  }
}

// Nueva función para obtener un gardener por ID
export async function getProviderById(id: string): Promise<IServiceProvider | null> {
  try {
      const res = await fetch(`${APIURL}/gardener/${id}`, {
        method: 'GET', 
        headers: {
        'Authorization': `Bearer ${TOKEN.token}`,
        'Content-Type': 'application/json', 
      },
      next: { revalidate: 1200 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch gardener with ID ${id}`);
    }

    const response = await res.json();
    console.log("Response from API:", response); // Imprimir toda la respuesta para ver el formato

    // Verifica si el formato es correcto
    if (response && typeof response === 'object' && !Array.isArray(response)) {
      return response.data || response; // Retorna 'data' si existe, sino retorna 'response'
    } else {
      throw new Error("Invalid data format, expected object in 'data'");
    }
  } catch (error: any) {
    console.error(`Error fetching gardener with ID ${id}:`, error);
    return null;
  }
}
