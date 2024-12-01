// "use client";
// import { getCarrouselById, postCarrouselImage } from "@/helpers/gardeners.helpers";
// import { IUserSession } from "@/interfaces/IUserSession";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// const GardenerDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState<string>(""); // Controla el componente activo
//   const [userSession, setUserSession] = useState<IUserSession | null>(null);
//   const [carrousel, setCarrousel] = useState<any[]>([]);

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.localStorage) {
//       const storedSession = JSON.parse(
//         localStorage.getItem("userSession") || ""
//       );
//       setUserSession(storedSession);
//     }
//   }, []);

//   const fetchCarrousel = async () => {
//     try {
//       const id = userSession?.user.id.toString();
//       if (id) {
//         const carrouselData = await getCarrouselById(id);
//         setCarrousel(carrouselData?.imageUrl || []);
//       }
//     } catch (error) {
//       console.error("Error buscando el carrousel:", error);
//     }
//   };

//   const uploadImage = async (e: any) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "gardener");
//     const response = await postCarrouselImage(formData, userSession?.user.id.toString());
//     console.log(response);
//     if(response){
//       fetchCarrousel();
//     }
//   }

//   useEffect(() => {
//     fetchCarrousel();
//   },[userSession]);

//   console.log(carrousel);

//     return (
//       <div className="min-h-screen bg-[#F4F9F4] font-sans">
//         {/* Menú de navegación */}
//         <nav className="bg-[#263238] p-4 shadow-md flex justify-center space-x-4">
//           <button
//             onClick={() => setActiveComponent("tasks")}
//             className="p-3 bg-[#4CAF50] text-white font-bold rounded-lg hover:bg-[#388E3C] transition duration-200"
//           >
//             Tareas
//           </button>
//           <button
//             onClick={() => setActiveComponent("calendar")}
//             className="p-3 bg-[#8BC34A] text-white font-bold rounded-lg hover:bg-[#CDDC39] transition duration-200"
//           >
//             Calendario
//           </button>
//           <button
//             onClick={() => setActiveComponent("profile")}
//             className="p-3 bg-[#FF5722] text-white font-bold rounded-lg hover:bg-[#FF7043] transition duration-200"
//           >
//             Mi Perfil
//           </button>
//         </nav>

//         {/* Contenido dinámico */}
//         <main className="p-6">
//           {activeComponent === "tasks" && (
//             <section>
//               <h1 className="text-2xl font-bold text-[#263238]">
//                 Tareas del Jardinero
//               </h1>
//               <p className="mt-2 text-[#4CAF50]">
//                 Aquí podrás gestionar tus tareas diarias.
//               </p>
//             </section>
//           )}

//           {activeComponent === "calendar" && (
//             <section>
//               <h1 className="text-2xl font-bold text-[#263238]">
//                 Calendario del Jardinero
//               </h1>
//               <p className="mt-2 text-[#8BC34A]">
//                 Planifica tu semana con el calendario.
//               </p>
//             </section>
//           )}

//           {activeComponent === "profile" && (
//             <section>
//               <h1 className="text-2xl font-bold text-[#263238]">
//                 Modificar información del perfil
//               </h1>
//               <div className="mt-4">
//                 <div className="text-lg">
//                   <strong>Nombre:</strong> {userSession?.user.name}
//                 </div>
//                 <div className="text-lg">
//                   <strong>Correo:</strong> {userSession?.user.email}
//                 </div>
//                 <div className="text-lg">
//                   <strong>Teléfono:</strong> {userSession?.user.phone}
//                 </div>
//               </div>

//               {/* Carrusel de imágenes */}
//               <div className="mt-8">
//                 <h2 className="text-xl font-semibold text-[#388E3C] mb-4">
//                   Carrusel de imágenes:
//                 </h2>
//                 <div className="relative w-full max-w-3xl mx-auto">
//                   <div className="overflow-hidden rounded-lg shadow-lg bg-white">
//                     <div className="flex snap-x snap-mandatory overflow-x-auto">
//                       {carrousel?.map((image: string, index: number) => (
//                         <div
//                           key={index}
//                           className="snap-center flex-none w-full"
//                           style={{ maxWidth: "400px" }}
//                         >
//                           <Image
//                             src={image}
//                             alt={`Imagen ${index + 1}`}
//                             width={1920}
//                             height={1080}
//                             className="w-full h-full object-cover rounded-lg"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Subir nueva imagen */}
//               <div className="mt-8">
//                 <h2 className="text-xl font-semibold text-[#FF5722] mb-4">
//                   Subir imagen al carrusel:
//                 </h2>
//                 <input
//                   type="file"
//                   onChange={uploadImage}
//                   className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-white"
//                 />
//               </div>
//             </section>
//           )}
//         </main>
//       </div>
//     );
//   };


// export default GardenerDashboard;










"use client";

import { getServicesProvided } from "@/helpers/service.helpers";
import CalendarGardener from "@/components/CalendarGardener/CalendarGardener";
import OrderList from "@/components/DashboardGardenerCompo/orders/orders";
import EditDashboard from "@/components/EditDashboard/EditDashboard";
import {  getProviderById, getTasks, updateProviderServices } from "@/helpers/gardeners.helpers";
import { IUserSession } from "@/interfaces/IUserSession";
import { IService } from "@/interfaces/IService";

import React, { useEffect, useState } from "react";
import CarrouselGardener from "@/components/carrouselGardener/CarrouselGardener";
import EditServicesGardener from "@/components/EditServicesGardener/EditServicesGardener";

const GardenerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState<string>("perfil");
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedSession = JSON.parse(
        localStorage.getItem("userSession") || ""
      );
      setUserSession(storedSession);
    }
  }, []);



  const fetchTasks = async (id: string) => {
    try {
      setLoader(true);
      setActiveComponent("tareas")
      const taskData = await getTasks(id);
      setTasks(taskData);
      setLoader(false);
    } catch (error) {
      throw new Error("Error buscando tareas");
    }
  };

  const fetchServices = async () => {
    try {
      const id = userSession?.user.id.toString();
      if(id){

        const serviceData =await getServicesProvided(id);
        setServices(serviceData);
      }

      const userId = userSession?.user?.id?.toString();
      if (userId) {
        const gardenerData = await getProviderById(userId);
        if (gardenerData && gardenerData.services) {
          setSelectedServices(gardenerData.services.map((s: any) => s.id));
        } else {
          setSelectedServices([]);
        }
      } else {
        setSelectedServices([]);
      }
    } catch (error) {
      throw new Error("Error buscando servicios");
    }
  };


  const handleServiceChange = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
 const saveServices = async () => {
    try {
      const userId = userSession?.user?.id?.toString();
      if (!userId) {
        throw new Error("No se encontró el ID del usuario");
      }

      await updateProviderServices(userId, selectedServices);
      alert("Servicios actualizados correctamente");

      // Reflejar cambios sin recargar del backend
      setServices((prev) =>
        prev.map((service) => ({
          ...service,
          isSelected: selectedServices.includes(service.id),
        }))
      );
    } catch (error) {
      throw new Error("Error actualizando servicios");
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchServices();
    }
  }, [userSession]);

if(loader){
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
    {/* Spinner */}
    <div className="w-16 h-16 border-4 border-green-300 border-t-green-500 rounded-full animate-spin mb-4"></div>

    {/* Texto */}
    <h2 className="text-xl font-semibold text-[#263238]">
      Cargando la informacion..
    </h2>
  </div>
  )
}

  return (
    <div >
      {/* Menú de navegación */}
      <nav className="flex justify-around bg-primary text-white p-4 rounded-md">
        <button
          onClick={() => fetchTasks(userSession?.user?.id.toString() || "")}
          className={`p-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded ${activeComponent === "tareas" ? "opacity-75" : ""
            }`}
        >
          Tareas
        </button>
        <button
          onClick={() => setActiveComponent("calendario")}
          className={`p-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded ${activeComponent === "calendario" ? "opacity-75" : ""
            }`}
        >
          Calendario
        </button>
        <button
          onClick={() => setActiveComponent("perfil")}
          className={`p-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded ${activeComponent === "perfil" ? "opacity-75" : ""
            }`}
        >
          Mi Perfil
        </button>
        <button
          onClick={() => setActiveComponent("Editar Servicios")}
          className={`p-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded ${activeComponent === "Editar Servicios" ? "opacity-75" : ""
            }`}
        >
          Editar Servicios
        </button>
      </nav>

      {/* Contenido dinámico */}
      <main className="p-6 bg-secondary">


        {activeComponent === "tareas" && (
          <section>
            <h1 className="text-2xl font-bold text-[#263238] m-3 text-center">
              Tareas del Jardinero
            </h1>
            <OrderList order={tasks}></OrderList>
          </section>
        )}

        {activeComponent === "perfil" && <EditDashboard />}

        {activeComponent === "calendario" && <CalendarGardener />}

        {activeComponent === "Editar Servicios" && (
  <section>
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#263238] mb-6">
          Servicios que Ofrezco
        </h1>
        {services.map((service) => (
          <div key={service.id} className="flex items-center">
            <input
              type="checkbox"
              id={service.id}
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceChange(service.id)}
              className="mr-3"
            />
            <label htmlFor={service.id} className="flex-grow">
              <span className="font-semibold">{service.detailService}</span>
              <span className="text-sm text-gray-500 ml-2">
                (${service.price} - {service.categories})
              </span>
            </label>
          </div>
        ))}

        <button
          onClick={saveServices}
          className="mt-4 w-full p-2 bg-[#4CAF50] text-white rounded hover:bg-[#388E3C]"
        >
          Guardar Servicios
        </button>
      </div>

      {/* Mostrar los servicios seleccionados */}
      {selectedServices.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-[#263238]">Servicios Seleccionados</h2>
          <ul className="space-y-2 mt-3">
            {services
              .filter((service) => selectedServices.includes(service.id))
              .map((service) => (
                <li key={service.id} className="flex justify-between items-center">
                  <span className="font-semibold">{service.detailService}</span>
                  <span className="text-sm text-gray-500">
                    (${service.price} - {service.categories})
                  </span>
                  <button
                    onClick={() => handleServiceChange(service.id)} // Permite desmarcar el servicio
                    className="text-red-500 text-sm ml-4"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
 


              <div>
                <CarrouselGardener/>
              </div>
              <div>
                <EditServicesGardener/>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default GardenerDashboard;




