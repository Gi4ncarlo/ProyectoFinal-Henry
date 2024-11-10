

const APIURL = process.env.NEXT_PUBLIC_API_URL

  export async function getGardenersDB() {
    try {
        const res = await fetch(`${APIURL}/gardener`, {
          mode: 'no-cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (!res.ok) {
        throw new Error(`Error en la solicitud: ${res.status}`);
      }
      const textResponse = await res.text();
      if (!textResponse.trim()) {
        throw new Error('La respuesta está vacía');
      }
  
      const gardeners = JSON.parse(textResponse);
      return gardeners;
  
    } catch (error) {
      console.error("Error fetching gardeners:", error);
      throw new Error('Error al cargar los jardineros');
    }
  }
  