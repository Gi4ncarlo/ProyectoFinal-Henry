import { IServiceProvider } from "@/interfaces/IServiceProvider";
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getGardenersDB = async (
  token: string,
  order: 'ASC' | 'DESC' = 'ASC',
  calification?: number,
  name?: string
): Promise<{ data: IServiceProvider[] }> => { 
  if (!token) {
    console.error("Token is missing or invalid.");
    return { data: [] }; // Retornar un objeto con `data` vacío si no hay token válido
  }
  const params = new URLSearchParams();
  params.append('order', order);
  if (calification) params.append('calification', calification.toString());
  if (name) params.append('name', name.toString());
  
  const response = await fetch(`${APIURL}/gardener?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data ;
};

// Nueva función para obtener un gardener por ID
export async function getProviderById(id: string): Promise<IServiceProvider | null> {
  let TOKEN = null;

  // Asegurarse de que estamos en el cliente antes de acceder a localStorage
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("userSession");
    TOKEN = storedToken ? JSON.parse(storedToken) : null;
  }

  if (!TOKEN || !TOKEN.token) {
    console.error("Token is missing or invalid.");
    return null; // Retornar null si no hay token válido
  }

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
    console.log("Response from API:", response, "token", TOKEN); // Imprimir toda la respuesta para ver el formato

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
