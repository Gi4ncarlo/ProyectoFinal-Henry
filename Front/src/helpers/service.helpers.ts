import { IService } from "@/interfaces/IService";

const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")

export const getServicesProvided = async(): Promise<IService[]> => {
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

export const updateProviderServices = async (gardenerId: string, serviceIds: string[]): Promise<IService[]> => {
  try {
    const response = await fetch(`${APIURL}/serviceProvided/${gardenerId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${TOKEN.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ services: serviceIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to update provider services');
    }

    const updatedServices = await response.json();
    return updatedServices;
  } catch (error) {
    console.error('Error updating provider services:', error);
    throw error;
  }
};