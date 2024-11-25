import React, { useEffect, useState } from "react";
import { Calendar, message, Spin } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { fetchReservedDays, disabledDate } from "@/helpers/calendarHelper";
import { GardenerCalendarProps } from "@/interfaces/IGardenerCalendar";

const GardenerCalendar: React.FC<GardenerCalendarProps> = ({
  gardenerId,
  onDateSelect,
}) => {
  const [reservedDays, setReservedDays] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!gardenerId) {
      // Mensajes de error sin modificar el estado inmediatamente
      setTimeout(
        () => message.error("El ID del jardinero no está disponible."),
        0
      );
      setLoading(false);
      return;
    }

    const fetchReserved = async () => {
      setLoading(true); // Solo cambia el estado al inicio
      try {
        const days = await fetchReservedDays(gardenerId);
        setReservedDays(days);
      } catch (error) {
        setTimeout(
          () => message.error("Error al cargar los días reservados."),
          0
        );
      } finally {
        setLoading(false); // Solo cambia al final
      }
    };

    fetchReserved();
  }, [gardenerId]);

  const handleSelect = (value: Dayjs) => {
    const selectedDate = value.format("YYYY-MM-DD");

    if (reservedDays.has(selectedDate)) {
      message.warning("Este día ya está reservado.");
      return;
    }

    if (typeof onDateSelect === "function") {
      onDateSelect(selectedDate);
    } else {
      console.warn(
        "La función 'onDateSelect' no está definida o no es válida."
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Calendario del Jardinero
      </h2>
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
          <Spin style={{ marginLeft: 8 }} />
        </div>
      ) : (
        <Calendar
          cellRender={
            (date) =>
              reservedDays.has(date.format("YYYY-MM-DD")) ? (
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
              ) : undefined // Devuelve `undefined` en lugar de `null` para no forzar el render
          }
          onSelect={handleSelect}
          disabledDate={(current) => disabledDate(current, reservedDays)}
        />
      )}
    </div>
  );
};

export default GardenerCalendar;
