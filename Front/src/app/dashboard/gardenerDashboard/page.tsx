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
import CalendarGardener from "@/components/CalendarGardener/CalendarGardener";
import OrderList from "@/components/DashboardGardenerCompo/orders/orders";
import EditDashboard from "@/components/EditDashboard/EditDashboard";
import { getCarrouselById, getTasks, postCarrouselImage } from "@/helpers/gardeners.helpers";
import { IUserSession } from "@/interfaces/IUserSession";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const GardenerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState<string>(""); // Controla el componente activo
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [carrousel, setCarrousel] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedSession = JSON.parse(
        localStorage.getItem("userSession") || ""
      );
      setUserSession(storedSession);
    }
  }, []);

  const fetchCarrousel = async () => {
    try {
      const id = userSession?.user.id.toString();
      if (id) {
        const carrouselData = await getCarrouselById(id);
        setCarrousel(carrouselData?.imageUrl || []);
      }
    } catch (error) {
      console.error("Error buscando el carrousel:", error);
    }
  };

  const fetchTasks = async (id: string) => {
    try {
      const taskData = await getTasks(id);
      setTasks(taskData);
    } catch (error) {
      console.error("Error buscando las tareas:", error);
    }
  };

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gardener");
    const response = await postCarrouselImage(formData, userSession?.user.id.toString());
    if (response) {
      fetchCarrousel();
    }
  }

  useEffect(() => {
    fetchCarrousel();
  }, [userSession]);
  return (
    <div className="min-h-screen bg-[#F4F9F4] font-sans">
      {/* Menú de navegación */}
      <nav className="bg-[#263238] p-4 shadow-md flex justify-center space-x-4">
        <button
          onClick={() => setActiveComponent("tareas")}
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
      </nav>

      {/* Contenido dinámico */}
      <main className="p-6">
        {activeComponent === "tareas" && (
          <section>
            <h1 className="text-2xl font-bold text-[#263238]">
              Tareas del Jardinero
            </h1>
            <button
              className="mt-2 text-[#4CAF50] bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => fetchTasks(userSession?.user?.id.toString() || "")}
            >
              Ver Tareas
            </button>
            <OrderList order={tasks}>

            </OrderList>

          </section>
        )}



        {activeComponent === "perfil" && <EditDashboard />}
        {activeComponent === 'calendario' && <CalendarGardener />}
        {activeComponent === 'ordenes' && <CalendarGardener />}

      </main>
    </div>
  );
};

export default GardenerDashboard;
