const TOKEN = JSON.parse(localStorage.getItem("userSession") || "null");

export const userEdit = async ( updatedData: any) => {
  try {

    if (!TOKEN || !TOKEN.token) {
      console.error("No hay token válido en el localStorage");
      throw new Error("Unauthorized: Token inválido o inexistente.");
    }

    const role = TOKEN.user?.role; 
    const userId = TOKEN.user?.id;


    if (!role || !userId) {
      console.error("Datos de usuario incompletos en el token.");
      throw new Error("Unauthorized: Datos de usuario incompletos.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${role}/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${TOKEN.token}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error del servidor:", errorDetails);
      throw new Error(`Error en la actualización: ${response.status} ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser; 
  } catch (error) {
    console.error("Error actualizando datos del usuario:");
    return null;
  }
};
