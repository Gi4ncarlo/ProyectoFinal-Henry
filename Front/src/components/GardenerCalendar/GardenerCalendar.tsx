import React, { useEffect, useState } from "react";
import { Calendar, message } from "antd";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GardenerCalendarProps } from "@/interfaces/IGardenerCalendar";

// Extender dayjs con el plugin customParseFormat
dayjs.extend(customParseFormat);

const GardenerCalendar: React.FC<GardenerCalendarProps> = ({ gardenerId, onDateSelect }) => {
  const [reservedDays, setReservedDays] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch días reservados del backend
  useEffect(() => {
    const fetchReservedDays = async () => {
      if (!gardenerId) {
        message.error("El ID del jardinero no está disponible.");
        setLoading(false); // Detener la carga si no hay ID
        return;
      }

      setLoading(true); // Iniciar carga
      try {
        const response = await axios.get(`/gardener/${gardenerId}/reservedDays`);
        const { reservedDays: days } = response.data;

        if (Array.isArray(days)) {
          const formattedDays = new Set(
            days.map((day: string) => dayjs(day, "DD-MM-YYYY").format("DD-MM-YYYY"))
          );
          setReservedDays(formattedDays);
        } else {
          throw new Error("Datos de días reservados no válidos");
        }
      } catch (error) {
        console.error("Error al obtener los días reservados:", error);
        message.error("No se pudieron cargar los días reservados.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservedDays();
  }, [gardenerId]); // Solo se ejecuta cuando cambia el gardenerId

  // Handler para seleccionar un día
  const handleSelect = (value: Dayjs) => {
    const selectedDate = value.format("DD-MM-YYYY");

    if (reservedDays.has(selectedDate)) {
      message.warning("Este día ya está reservado.");
      return;
    }

    onDateSelect(selectedDate); // Llamada a la prop onDateSelect
  };

  // Renderización del calendario con días reservados resaltados
  const dateCellRender = (date: Dayjs) => {
    const isReserved = reservedDays.has(date.format("DD-MM-YYYY"));

    return isReserved ? (
      <div
        style={{
          backgroundColor: "#ff4d4f",
          color: "white",
          borderRadius: "50%",
          textAlign: "center",
          padding: "2px 0",
        }}
      >
        Reservado
      </div>
    ) : null;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Calendario del Jardinero</h2>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#888",
          }}
        >
          Cargando los días reservados...
        </div>
      ) : (
        <Calendar
          cellRender={dateCellRender}
          onSelect={handleSelect}
          disabledDate={(current) =>
            current && current < dayjs().startOf("day") // Deshabilita fechas pasadas
          }
        />
      )}
    </div>
  );
};

export default GardenerCalendar;
