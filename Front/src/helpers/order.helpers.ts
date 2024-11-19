const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const hireServices = async (data: {
    date: string;
    isApproved: boolean;
    gardenerId: string;
    userId: string;
    serviceId: string[];
  }) => {

    // Asegurarse de que estamos en el cliente antes de acceder a localStorage
    let TOKEN = null;
  
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("userSession");
      TOKEN = storedToken ? JSON.parse(storedToken) : null;
    }
  
    // Verifica que haya un token disponible
    if (!TOKEN || !TOKEN.token) {
      console.error("Token is missing or invalid.");
      throw new Error("Token is missing or invalid.");
    }
    try {
      const response = await fetch(`${APIURL}/services-order`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to hire services');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error hiring services:', error);
      throw error; // Propagar el error para manejarlo en el componente
  }
};
