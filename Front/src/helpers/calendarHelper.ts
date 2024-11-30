// helpers/calendarHelper.ts

import dayjs from "dayjs";
import { message } from "antd";

// Obtiene el token del almacenamiento local
const getAuthToken = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No se encontró el token de autenticación. Inicia sesión nuevamente.");
    }
    return token;
  } catch (error) {
    console.error("Error al acceder a localStorage:", error);
    message.error("Error al verificar el token de autenticación.");
    return null;
  }
};

// Fetch días reservados del backend utilizando fetch
export const fetchReservedDays = async (gardenerId: string): Promise<Set<string>> => {
  console.log("ID del jardinero:", gardenerId);

  if (!gardenerId) {
    message.error("El ID del jardinero no está disponible.");
    return new Set<string>();
  }

  let token = null;

  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("userSession");
    token = storedToken ? JSON.parse(storedToken) : null;
  }

  if (!token || !token.token) {
    console.error("Token is missing or invalid.");
    throw new Error("Token is missing or invalid.");
  }

  try {
    // Realizar la solicitud al API usando fetch
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/gardener/${gardenerId}/reservedDays`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token.token}`,
          "Content-Type": "application/json", // Asegúrate de enviar el tipo de contenido correcto
        },
      }
    );


    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error en la solicitud al servidor.");
    }

    const data = await response.json();
    console.log("Días reservados desde el API:", data.reservedDays.toLocaleString());

    // Filtrar y formatear las fechas
    const formattedDays = new Set<string>(
      data.reservedDays
        .filter((day: unknown): day is string => typeof day === "string")
        .map((day: string) => dayjs(day).format("YYYY-MM-DD"))
    );

    console.log("Días formateados:", Array.from(formattedDays));
    return formattedDays;
  } catch (error) {
    return new Set<string>();
  }
};

// Deshabilitar fechas pasadas y reservadas
export const disabledDate = (current: dayjs.Dayjs, reservedDays: Set<string>): boolean => {
  if (!current) return false;

  const isPast = current.isBefore(dayjs().startOf("day"));
  const isReserved = reservedDays.has(current.format("YYYY-MM-DD"));

  return isPast || isReserved;
};
