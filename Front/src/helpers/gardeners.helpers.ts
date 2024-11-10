import { IServiceProvider } from "@/interfaces/IServiceProvider";


const APIURL = process.env.NEXT_PUBLIC_API_URL


export async function getGardenersDB(): Promise<IServiceProvider[]> {
    try {
      const res = await fetch(`${APIURL}/gardener`, {
        next: { revalidate: 1200 },
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch gardeners");
      }
  
      const response = await res.json();
      console.log(response);
      // Verifica que la propiedad `data` esté presente y sea un arreglo
      if (Array.isArray(response.data)) {
        return response.data;  // Accede a la propiedad `data`
      } else {
        throw new Error("Invalid data format, expected an array in 'data'");
      }
    } catch (error: any) {
      console.error("Error fetching gardeners:", error);
      return [];  // Devuelve un arreglo vacío en caso de error
    }
  }
  