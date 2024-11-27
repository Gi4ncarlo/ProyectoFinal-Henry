import React from "react";
import Image from "next/image";

const SobreNosotrosCompo = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/fondoContacto.webp")' }}
    >
      <main className="flex min-h-screen flex-col justify-between py-8 mt-16 text-center sm:p-24 sm:text-justify">
        {/* Contenedor principal */}
        <div className=" bg-white p-4 shadow-lg grid grid-cols-1 gap-4 my-2 sm:p-8 lg:max-w-4xl rounded-lg">
          {/* Título */}
          <h1 className="text-3xl font-extrabold mb-6 text-[#263238] font-playfair sm:text-4xl lg:text-5xl">
            ¿Quiénes somos?
          </h1>

          {/* Descripción */}
          <p className="mb-6 font-lora text-sm sm:text-base text-[#263238]">
            <strong>Vicnasol</strong> es un proyecto de servicios de jardinería
            que busca resolver el problema de aquellas personas que quieren
            cuidar su jardín, pero no tienen la habilidad para hacerlo. En
            Vicnasol nos dedicamos a brindar un servicio donde el contacto
            Cliente-Proveedor sea sencillo, rápido y eficiente.
          </p>

          {/* Cita destacada */}
          <div className="relative bg-[#CDDC39] p-6 pl-10 mb-6 border-l-8 border-[#388E3C] font-lora text-[#263238] rounded-lg shadow-md">
            <span className="absolute left-0 top-0 text-6xl text-[#388E3C] leading-none font-playfair">
              “
            </span>
            <p className="text-lg italic">
              En Vicnasol buscamos facilitar el acceso a los servicios de
              mantenimiento de jardines para empresas, comunidades residenciales
              y particulares.
            </p>
            <span className="absolute right-0 bottom-0 text-6xl text-[#388E3C] leading-none font-playfair">
              ”
            </span>
          </div>

          {/* Más detalles sobre los servicios */}
          <p className="mb-4 font-lora text-sm sm:text-base text-[#263238]">
            Somos un grupo de 6 integrantes del curso Full Stack de @Henry. Nos dividimos las tareas principalmente enfocandonos en la especialidad de cada uno.
          </p>

          {/* Lista de servicios */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 font-lora text-sm sm:text-base text-[#263238] mx-auto">
            {[
              {
                name: "Greta Tarabelli",
                role: "Frontend Developer",
                github: "https://github.com/gtgretatarabelli",
              },
              {
                name: "Lucas Badino",
                role: "Backend Developer",
                github: "https://github.com/lucasbadino",
              },
              {
                name: "Pablo Ricci",
                role: "Frontend Developer",
                github: "https://github.com/olbap90",
              },
              {
                name: "Mauricio Ricci",
                role: "Backend Developer",
                github: "https://github.com/MauriPinoRicci",
              },
              {
                name: "Ignacio Arevalo",
                role: "Backend Developer",
                github: "https://github.com/Negritoyunou",
              },
              {
                name: "Giancarlo Zanarini",
                role: "Backend Developer",
                github: "https://github.com/Gi4ncarlo",
              },
            ].map((person, index) => (
              <li
                key={index}
                className="flex flex-col bg-[#F1F8E9] p-4 rounded-lg shadow-md border border-[#CDDC39] hover:shadow-lg transition duration-300"
              >
                <p className="font-bold text-[#263238]">{person.name}</p>
                <p className="italic mb-2">{person.role}</p>
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-[#4CAF50] text-white py-2 px-4 rounded-md hover:bg-[#388E3C] transition duration-200 font-bold w-full">
                    GitHub
                  </button>
                </a>
              </li>
            ))}
          </ul>

          {/* Descripción final */}
          <p className="font-lora text-sm sm:text-base text-[#263238]">
            Esperamos que disfrutes nuestro servicio y que podamos ayudarte a
            cuidar tu jardín. 
          </p>

            <p>
              <span className="font-bold">¡Gracias por elegirnos!</span>
            </p>
          <Image
            src="/favicon.ico"
            alt="Fondo de la página principal"
            width={200}
            height={200}
            className="w-30 h-30 mx-auto rounded-[50%] mt-4"
          />
        </div>
      </main>
    </div>
  );
};

export default SobreNosotrosCompo;
