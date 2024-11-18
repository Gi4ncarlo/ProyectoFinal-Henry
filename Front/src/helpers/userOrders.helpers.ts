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

// Función para obtener los usuarios
export const getUsers = async (token: string) => {
  try {
    const res = await fetch(`${APIURL}/user`, {  // Corregido la plantilla literal
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Aquí se agrega el token
      },
    });
    console.log("response",res);
    if (!res.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    const users = await res.json();
    return users;
  } catch (error) {
    console.error(error);  // Agrega un log para verificar errores
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
}
