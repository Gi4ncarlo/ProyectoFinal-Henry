import { IServiceProvider } from "@/interfaces/IServiceProvider";
const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")



export const getGardenersDB = async (
  order: 'ASC' | 'DESC' = 'ASC',
  calification?: number,
  name?: string
): Promise<IServiceProvider[]> => { 

  const params = new URLSearchParams();
  params.append('order', order);
  if (calification) params.append('calification', calification.toString());
  if (name) params.append('name', name.toString());
  try {
    const response = await fetch(`${APIURL}/gardener?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN.token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch gardeners');
    }

    const gardeners = await response.json();
    console.log(gardeners)
    return gardeners// Devuelve un arreglo seguro
  } catch (error) {
    console.error('Error fetching gardeners:', error);
    return []; // Asegura que siempre devuelve un arreglo
  }
};

// Nueva función para obtener un gardener por ID
export async function getProviderById(id: string): Promise<IServiceProvider | null> {

  console.log("GARDENER HELPERS ID", id);
  
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
    console.log("Response from API:", response , "token", TOKEN); // Imprimir toda la respuesta para ver el formato

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
