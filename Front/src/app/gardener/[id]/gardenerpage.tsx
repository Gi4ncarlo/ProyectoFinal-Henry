// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { IServiceProvider } from '@/interfaces/IServiceProvider';
// import { getProviderById } from '@/helpers/gardeners.helpers';
// import { getServicesProvided } from '@/helpers/service.helpers';
// import { useParams, useRouter } from 'next/navigation';
// import { IService } from '@/interfaces/IService';
// import { hireServices } from '@/helpers/order.helpers';
// import { IUserSession } from '@/interfaces/IUserSession';

const ProviderDetail: any = () => {
//   const router = useRouter();
//   const params = useParams();
//   const id = params?.id as string | undefined;

//   const [gardener, setGardener] = useState<IServiceProvider | null>(null);
//   const [services, setServices] = useState<IService[]>([]);
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [userSession, setUserSession] = useState<IUserSession | null>(null);
//   const [orderService, setOrderService] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
                                                     
//   useEffect(() => {
//     const fetchGardener = async () => {
//       if (id) {
//         try {
//           const gardenerData = await getProviderById(id);
//           setGardener(gardenerData);
//         } catch (error) {
//           console.error('Error buscando información del jardinero:', error);
//           setError('No se pudo cargar la información del jardinero.');
//         }
//       }
//     };
    
//     const fetchServices = async () => {
//       try {
//         const serviceData = await getServicesProvided();
//         setServices(serviceData);
//       } catch (error) {
//         console.error('Error buscando los servicios:', error);
//         setError('No se pudieron cargar los servicios.');
//       }
//     };
    
//     fetchGardener();
//     fetchServices();
//   }, [id]);

//     useEffect(() => {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         const storedSession = JSON.parse(
//           localStorage.getItem("userSession") || ""
//         );
//         setUserSession(storedSession);
//       }
//     }, []);

//   // Manejar selección de servicios
//   const handleServiceChange = (serviceId: string) => {
//     setSelectedServices((prevSelected) =>
//       prevSelected.includes(serviceId)
//         ? prevSelected.filter((id) => id !== serviceId) // Deseleccionar
//         : [...prevSelected, serviceId] // Seleccionar
//     );
//   };

//   // Contratar servicios
//   const handleHireClick = async () => {
//     if (!userSession || !userSession.user?.id) {
//       setError('No se encontró la sesión del usuario.');
//       return;
//     }

//     if (!gardener) {
//       setError('Información del jardinero no disponible.');
//       return;
//     }

//     try {
//       const order = await hireServices({
//         date: new Date().toISOString(),
//         isApproved: false,
//         gardenerId: gardener.id.toString(),
//         userId: userSession.user.id.toString(),
//         serviceId: selectedServices,
//       });

//       setOrderService(order);
//       setSelectedServices([]);
//       router.push('/dashboard/userDashboard');
//     } catch (error) {
//       console.error('Error contratando servicios:', error);
//       setError('Hubo un problema al contratar los servicios.');
//     }
//   };

//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!gardener) return <div>Cargando...</div>;

//   return (
//     <div className="flex bg-[#4CAF50]">
//       <div className="max-w-3xl mx-auto mt-32 mb-14 p-6 bg-white rounded-lg shadow-lg">
//         <div className="flex items-center">
//           <Image
//             className="rounded-full"
//             src={gardener.profileImageUrl || '/default-profile.jpg'}
//             alt={`${gardener.name}'s profile`}
//             width={120}
//             height={120}
//           />
//           <div className="ml-6">
//             <h1 className="text-2xl font-bold text-[#263238]">{gardener.name}</h1>
//             <p className="text-[#8BC34A]">@{gardener.username}</p>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-lg font-semibold text-[#263238]">Experiencia:</h2>
//           <p className="text-gray-600">{gardener.experience}</p>

//           <h2 className="text-lg font-semibold text-[#263238] mt-4">Puntuación:</h2>
//           <div className="flex items-center mt-3">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <svg
//                 key={index}
//                 className={`w-5 h-5 ${index < Math.floor(gardener.calification) ? 'text-yellow-400' : 'text-gray-300'}`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.2 8.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
//               </svg>
//             ))}
//             <span className="ml-2 text-sm text-gray-500">{gardener.calification.toFixed(1)}</span>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-lg font-semibold text-[#263238]">Servicios Disponibles:</h2>
//           <div className="mt-2">
//             {services.map((service) => (
//               <div key={service.id} className="mb-4">
//                 <label className="block text-[#263238]">
//                   <input
//                     type="checkbox"
//                     checked={selectedServices.includes(service.id)}
//                     onChange={() => handleServiceChange(service.id)}
//                     className="mr-2"
//                   />
//                   {service.detailService}
//                 </label>
//                 <p className="ml-6 text-sm text-[#263238]">Precio: ${service.price}</p>
//                 <p className="ml-6 text-sm text-[#263238]">Categoría: {service.categories}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={handleHireClick}
//             className="w-full mt-4 p-2 bg-[#4caf50] text-white font-bold rounded hover:bg-[#388e3c]"
//           >
//             Contratar Servicios
//           </button>
//         </div>
//       </div>
//     </div>
//   );
};

// export default ProviderDetail;
