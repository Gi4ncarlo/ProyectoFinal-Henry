import { IServiceProvider } from "@/interfaces/IServiceProvider";
const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");

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
    return gardeners; // Devuelve un arreglo seguro
  } catch (error) {
    console.error('Error fetching gardeners:', error);
    return []; // Asegura que siempre devuelve un arreglo
  }
};

