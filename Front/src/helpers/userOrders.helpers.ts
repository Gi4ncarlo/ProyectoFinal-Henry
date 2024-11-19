import { log } from "console";

const APIURL: string = process.env.NEXT_PUBLIC_API_URL as string;

// Función para obtener las órdenes de un usuario
export async function getuserOrdersDB(id: number, token: string) {
  try {
    const res = await fetch(`${APIURL}/user/${id}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Aquí se agrega el token
      },
    });
    if (!res.ok) {
      throw new Error("Error al obtener las órdenes");
    }
    const orders = await res.json();
    return orders;
  } catch (error) {
    console.error(error);  // Agrega un log para verificar errores
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
}


 const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null")
export async function getAllUsers() {
  try {
  
    const response = await fetch(`${APIURL}/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN.token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado: token no válido');
      } else {
        throw new Error('La respuesta de la red no fue correcta');
      }
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error al recuperar usuarios', error);
    throw error; // Re-throw the error for proper handling in the calling component
  }
}





export async function banUser(userId: string, token: string, isBanned: boolean) {
  const response = await fetch(`${APIURL}/user/${userId}/ban`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${TOKEN.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isBanned })
  });

  if (!response.ok) {
    throw new Error('Failed to ban user');
  }
  return await response.json();
}
