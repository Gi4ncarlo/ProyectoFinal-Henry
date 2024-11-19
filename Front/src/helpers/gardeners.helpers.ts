import { IServiceProvider } from "@/interfaces/IServiceProvider";

const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");

export const getGardenersDB = async (
  order: 'ASC' | 'DESC' = 'ASC',
  calification?: number,
  name?: string
): Promise<IServiceProvider[]> => { 
  // Verificar que el token es válido antes de hacer la solicitud
  if (!TOKEN || !TOKEN.token) {
    console.error('No valid token found');
    return []; // Devuelve un arreglo vacío si el token no es válido
  }

  const params = new URLSearchParams();
  params.append('order', order);
  if (calification) params.append('calification', calification.toString());
  if (name) params.append('name', name);

  try {
    const response = await fetch(`${APIURL}/gardener?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN.token}`,
        'Content-Type': 'application/json',
      },
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      console.error(`Error fetching gardeners: ${response.status} - ${response.statusText}`);
      throw new Error('Failed to fetch gardeners');
    }

    const gardeners = await response.json();
    console.log('Response:', gardeners); // Inspeccionar la respuesta de la API

    // Devuelve los jardineros, asegurando que siempre se devuelve un arreglo
    return Array.isArray(gardeners) ? gardeners : [];
  } catch (error) {
    console.error('Error fetching gardeners:', error);
    return []; // Devuelve un arreglo vacío en caso de error
  }
};

// Nueva función para obtener un gardener por ID
export async function getProviderById(id: string): Promise<IServiceProvider | null> {
  if (!TOKEN || !TOKEN.token) {
    console.error('No valid token found');
    return null; // Devuelve null si no hay un token válido
  }

  try {
    const res = await fetch(`${APIURL}/gardener/${id}`, {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${TOKEN.token}`,
        'Content-Type': 'application/json', 
      },
      next: { revalidate: 1200 },
    });

    // Verifica si la respuesta fue exitosa
    if (!res.ok) {
      console.error(`Error fetching gardener with ID ${id}: ${res.status} - ${res.statusText}`);
      throw new Error(`Failed to fetch gardener with ID ${id}`);
    }

    const response = await res.json();
    console.log('Response:', response); // Inspeccionar la respuesta de la API

    // Verifica si el formato de la respuesta es el esperado
    if (response && typeof response === 'object' && !Array.isArray(response)) {
      return response.data || response; // Retorna 'data' si existe, sino retorna 'response'
    } else {
      throw new Error("Invalid data format, expected object in 'data'");
    }
  } catch (error: any) {
    console.error(`Error fetching gardener with ID ${id}:`, error);
    return null; // Devuelve null en caso de error
  }
}
