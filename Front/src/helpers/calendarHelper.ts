import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";

const getAuthToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) {
    message.error("No se encontró el token de autenticación. Inicia sesión nuevamente.");
  }
  return token;
};

// Fetch días reservados del backend
export const fetchReservedDays = async (gardenerId: string): Promise<Set<string>> => {
  if (!gardenerId) {
    message.error("El ID del jardinero no está disponible.");
    return new Set<string>();
  }

  const token = getAuthToken(); // Obtén el token
  if (!token) return new Set<string>();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/gardener/${gardenerId}/reservedDays`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { reservedDays: days } = response.data;

    // Verificar la estructura de datos y formatear las fechas
    if (!days || !Array.isArray(days)) {
      throw new Error("La estructura de los datos recibidos es incorrecta.");
    }

    const formattedDays = new Set(
      days.map((day: string) => dayjs(day, "YYYY-MM-DD").format("YYYY-MM-DD"))
    );
    return formattedDays;
  } catch (error) {
    console.error("Error al obtener los días reservados:", error);
    message.error("No se pudieron cargar los días reservados. Intenta nuevamente.");
    return new Set<string>();
  }
};

// Función para deshabilitar fechas reservadas y pasadas
export const disabledDate = (current: dayjs.Dayjs, reservedDays: Set<string>): boolean => {
  if (!current || !(current instanceof dayjs)) return false;
  return current.isBefore(dayjs().startOf("day")) || reservedDays.has(current.format("YYYY-MM-DD"));
};
