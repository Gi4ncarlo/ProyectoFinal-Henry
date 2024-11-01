import Image from "next/image";
import { SlCheck } from "react-icons/sl";

export default function Home() {
  return (
    <main className="bg-[url('/images/fondo_proyectos.jpg')] bg-center bg-cover h-full min-h-screen">
      <div className="">
        <h1 className="text-green-400 text-center text-xl font-bold font-cinzel pt-16 lg:text-4xl lg:pt-28">
          Proyectos Finalizados
        </h1>
      </div>

      <div className="grid grid-cols-1 py-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:mx-3 place-items-center">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-green-400 rounded-lg overflow-hidden w-full sm:max-w-xs lg:max-w-[600px] lg:h-[480px] flex flex-col
             hover:scale-105 hover:shadow-lg transition-all delay-150"
          >
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Imagen proyecto"
              width={1920}
              height={1080}
              className="w-full max-h-70 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-base font-lato font-[700] py-1 lg:text-xl text-green-900">
                  {project.title}
                </h2>
                <p className="font-nunito text-sm lg:text-base text-green-100">
                  {project.description}
                </p>
              </div>

              {/* EFECTOS Y ESTILOS A MODO DE EJEMPLO  */}
              <div className="grid grid-cols-3 gap-2 mt-4 lg:mt-0">
                <div className="rounded-lg bg-green-600 p-1 lg:p-2 flex justify-center items-center gap-2 hover:shadow-lg cursor-pointer"> 
                <SlCheck className="text-green-700"/>
                  <p className="font-lato text-lime-100">Jardin</p>
                </div>
                <div className="rounded-lg bg-green-600 p-1 lg:p-2 flex justify-center items-center gap-2 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer ">
                <SlCheck/>
                  <p className="font-lato  text-lime-100">Macetas</p>
                </div>
                <div className="rounded-lg bg-green-600 p-1 lg:p-2 flex justify-center items-center gap-2 hover:shadow-lg">
                <SlCheck/>
                  <p className="font-lato text-green-400">Flores</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

const projects = [
  {
    title: "Zen Garden Oasis",
    description: "A tranquil Japanese-inspired garden.",
  },
  {
    title: "Urban Rooftop Haven",
    description:
      "A modern rooftop garden featuring drought-resistant plants and a vertical herb wall.",
  },
  {
    title: "English Cottage Garden",
    description:
      "A charming and colorful cottage garden with winding paths and fragrant flowers.",
  },
  {
    title: "Polish Garden",
    description:
      "A charming and colorful cottage garden with winding paths and fragrant flowers.",
  },
];
