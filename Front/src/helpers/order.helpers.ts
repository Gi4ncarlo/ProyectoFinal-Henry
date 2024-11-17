const APIURL = process.env.NEXT_PUBLIC_API_URL
const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")

export const hireServices = async (data: {
    date: string;
    isApproved: boolean;
    gardenerId: string;
    userId: string;
    serviceId: string[];
  }) => {
    try {
      console.log(data);
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