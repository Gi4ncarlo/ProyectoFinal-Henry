import { IService } from "@/interfaces/IService";

const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")

export const getServicesProvided = async (token: string): Promise<IService[]> => {
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
    return [];
  }
};
