import React, { useEffect, useState } from "react";
import { Calendar, message, Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";


const GardenerCalendar: React.FC<GardenerCalendarProps> = ({ gardenerId }) => {
  const [reservedDays, setReservedDays] = useState<dayjs.Dayjs[]>([]); // Aseguramos el tipo
  const [loading, setLoading] = useState<boolean>(true);


  // Fetch días reservados del backend
  useEffect(() => {
    const fetchReservedDays = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/gardener/${gardenerId}`);
        setReservedDays(
          data.reservedDays?.map((day: string) => dayjs(day, "DD-MM-YYYY")) ||
            []
        );
      } catch (error) {
        console.error("Error al obtener los días reservados:", error);
        message.error("No se pudieron cargar los días reservados");
      } finally {
        setLoading(false);
      }
    };


    fetchReservedDays();
  }, [gardenerId]);


  // Handler para reservar un día
  const handleSelect = async (value: dayjs.Dayjs) => {
    const selectedDate = value.format("DD-MM-YYYY");


    if (reservedDays.some((day) => day.isSame(value, "day"))) {
      message.warning("Este día ya está reservado");
      return;
    }


    try {
      await axios.post(`/gardener/${gardenerId}/reserve`, {
        day: selectedDate,
      });
      setReservedDays([...reservedDays, value]);
      message.success(`Día ${selectedDate} reservado correctamente`);
    } catch (error) {
      console.error("Error al reservar el día:", error);
      message.error("No se pudo reservar el día");
    }
  };


  // Renderización del calendario con días reservados resaltados
  const dateCellRender = (date: dayjs.Dayjs) => {
    const isReserved = reservedDays.some((day) => day.isSame(date, "day"));
    if (isReserved) {
      return (
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
      );
    }
    return null;
  };


  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Calendario del Jardinero</h2>
      {loading ? (
        <Spin
          tip="Cargando días reservados..."
          style={{ display: "block", margin: "20px auto" }}
        />
      ) : (
        <Calendar
          cellRender={dateCellRender}
          onSelect={handleSelect}
          disabledDate={(current) =>
            current && current < dayjs().startOf("day")
          } // Deshabilita fechas pasadas
        />
      )}
    </div>
  );
};


export default GardenerCalendar;