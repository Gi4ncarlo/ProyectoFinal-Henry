import { IService } from "../interfaces/IService";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getServicesProvided = async (): Promise<IService[]> => {
  // Asegúrate de que estamos en el cliente antes de acceder a localStorage
  let TOKEN = null;

  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("userSession");
    TOKEN = storedToken ? JSON.parse(storedToken) : null;
  }

  // Verifica que haya un token disponible
  if (!TOKEN || !TOKEN.token) {
    console.error("Token is missing or invalid.");
    return []; // Si el token no está disponible, devuelve un arreglo vacío
  }

  try {
    const response = await fetch(`${APIURL}/serviceProvided`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }

    const services = await response.json();
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return []; // Si hay un error, devuelve un arreglo vacío
  }
};
