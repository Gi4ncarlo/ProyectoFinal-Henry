const APIURL: string = process.env.NEXT_PUBLIC_API_URL as string;

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
    console.log("ORDERS", orders);
    
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
