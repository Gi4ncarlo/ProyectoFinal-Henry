import React from 'react';
import Image from "next/image";

const SobreNosotrosCompo = () => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between py-8 mt-16 text-center sm:p-24 sm:text-justify">
        {/* Contenedor principal */}
        <div className="mx-auto bg-white p-4 shadow-lg grid grid-cols-1 gap-4 my-2 sm:p-8 lg:max-w-4xl">
          {/* Título */}
          <h1 className="text-3xl font-extrabold mb-6 text-[#263238] font-playfair sm:text-4xl lg:text-5xl">
            ¿Quiénes somos?
          </h1>

          {/* Descripción */}
          <p className="mb-6 font-lora text-sm sm:text-base text-[#263238]">
            <strong>Vicnasol</strong> es una empresa de servicios ambientales con más de 30 años de experiencia, ubicada en Carrasco, Montevideo y Ciudad de la Costa, Uruguay. Estamos especializados en todos los trabajos de jardinería, ofreciendo soluciones personalizadas para satisfacer las necesidades de particulares y empresas que buscan un servicio de calidad. Nuestro equipo de 10 profesionales altamente cualificados le asesorará y guiará en cada etapa de su proyecto.
          </p>

          {/* Cita destacada */}
          <div className="relative bg-[#F1F8E9] p-6 pl-10 mb-6 border-l-8 border-[#388E3C] font-lora text-[#263238]">
            <span className="absolute left-0 top-0 text-6xl text-[#388E3C] leading-none font-playfair">
              “
            </span>
            <p className="text-lg italic">
              En Vicnasol damos vida a tus ideas. Desde la primera reunión hasta la finalización de cada proyecto, nos dedicamos a garantizar que no se pase por alto ni un solo detalle.
            </p>
            <span className="absolute right-0 bottom-0 text-6xl text-[#388E3C] leading-none font-playfair">
              ”
            </span>
          </div>

          {/* Más detalles sobre los servicios */}
          <p className="mb-4 font-lora text-sm sm:text-base text-[#263238]">
            En <strong>Vicnasol</strong> ofrecemos una amplia gama de servicios de mantenimiento de jardines para empresas, comunidades residenciales y particulares, así como mantenimiento de plantas de interior para centros comerciales, oficinas y hoteles, potenciando la imagen corporativa de cara a los clientes.
          </p>

          {/* Lista de servicios */}
          <ul className="list-disc pl-6 mb-4 font-lora text-justify text-sm sm:text-base text-[#263238]">
            <li>Desmonte y limpieza de parcelas, taludes, zonas industriales, etc.</li>
            <li>Poda y tala de árboles mediante técnicas trepadoras y/o camiones grúa, realizadas por profesionales capacitados.</li>
            <li>Instalación y reparación de sistemas de riego automático.</li>
            <li>Tratamientos fitosanitarios.</li>
            <li>Control de plagas de hortalizas.</li>
            <li>Proyectos de jardinería.</li>
          </ul>

          {/* Descripción final */}
          <p className="font-lora text-sm sm:text-base text-[#263238]">
            En <strong>Vicnasol</strong> nuestro objetivo es dar un servicio integral y de calidad, garantizando la satisfacción del cliente y el cuidado del medio ambiente. Estamos orgullosos de nuestra trayectoria y de la confianza que nuestros clientes han depositado en nosotros a lo largo de los años.
          </p>

          {/* Botón */}
          <div className="text-center mt-6">
            <a href="/contacto">
              <button className="bg-[#4CAF50] text-white py-2 px-6 rounded-md hover:bg-[#388E3C] transition duration-200 font-bold">
                Contáctanos
              </button>
            </a>
          </div>
        </div>

        {/* Galería de imágenes */}
        <div className="grid grid-cols-1 gap-4 mx-4 my-4 sm:grid-cols-2 lg:grid-cols-3">
          <Image
            src="/images/trabajador.jpg"
            alt="Trabajador"
            width={1800}
            height={920}
            className="hover:transform hover:scale-105 transition duration-200 rounded-md"
          />
          <Image
            src="/images/entrada.jpg"
            alt="Entrada"
            width={1800}
            height={920}
            className="hover:transform hover:scale-105 transition duration-200 rounded-md"
          />
          <Image
            src="/images/rosas.jpg"
            alt="Rosal"
            width={1800}
            height={920}
            className="hover:transform hover:scale-105 transition duration-200 rounded-md"
          />
        </div>
      </main>
    </div>
  );
};

export default SobreNosotrosCompo;
