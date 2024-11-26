import axios from "axios";
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

// Fetch días reservados del backend
export const fetchReservedDays = async (gardenerId: string): Promise<Set<string>> => {
  if (!gardenerId) {
    message.error("El ID del jardinero no está disponible.");
    return new Set<string>();
  }

  const token = getAuthToken();
  if (!token) return new Set<string>();

  try {
    // Realizar la solicitud al API
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/gardener/${gardenerId}/reservedDays`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Aquí agregamos el console.log para ver los datos que devuelve el API
    console.log("Días reservados desde el API:", response.data.reservedDays);

    const formattedDays = new Set<string>(
      response.data.reservedDays
        .filter((day: unknown): day is string => typeof day === "string")
        .map((day: string) => dayjs(day).format("YYYY-MM-DD"))
    );

    console.log("Días formateados:", Array.from(formattedDays));
    return formattedDays;
  } catch (error) {
    console.error("Error al obtener los días reservados:", error);
    message.error("No se pudieron cargar los días reservados. Intenta nuevamente.");
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
