import React from 'react'

import Image from "next/image";
// import { Playfair_Display, Roboto, Lora } from '@next/font/google';

// const playfairDisplay = Playfair_Display({
//   subsets: ['latin'],
//   variable: '--font-playfair',
// });

// const roboto = Roboto({
//   subsets: ['latin'],
//   variable: '--font-roboto',
//   weight: ['400', '700'],
// });

// const lora = Lora({
//   subsets: ['latin'],
//   variable: '--font-lora',
// });


const SobreNosotrosCompo = () => {
  return (

   <div>
      <main className={`flex min-h-screen flex-col items-center justify-between py-8 mt-16 text-center sm:p-24 sm:text-justify`}>
        <div className="mx-auto bg-white p-1 shadow-lg grid grid-cols-1 gap-4 my-2 sm:p-8 lg:max-w-4xl">
          <h1 className="text-xl font-bold mb-1 font-playfair sm:text-2xl lg:text-4xl lg:mb-6">Who We Are</h1>
          <p className="mb-4 font-lora text-sm sm:text-base">
          <strong>Vicnasol</strong> es una empresa de servicios ambientales con más de 30 años de experiencia, ubicada en Carrasco, Montevideo y Ciudad de la Costa, Uruguay. Estamos especializados en todos los trabajos de jardinería, ofreciendo soluciones personalizadas para satisfacer las necesidades de particulares y empresas que buscan un servicio de calidad. Nuestro equipo de 10 profesionales altamente cualificados le asesorará y guiará en cada etapa de su proyecto.
          </p>

          <div className="relative bg-gray-200 p-6 pl-10 mb-6 border-l-8 border-green-700 font-lora">
            <span className="absolute left-0 top-0 text-6xl text-green-700 leading-none font-playfair">
              “
            </span>
            <p className="text-lg italic">
            En Vicnasol damos vida a tus ideas. Desde la primera reunión hasta la finalización de cada proyecto, nos dedicamos a garantizar que no se pase por alto ni un solo detalle.
            </p>
            <span className="absolute right-0 bottom-0 text-6xl text-green-700 leading-none font-playfair">
              ”
            </span>
          </div>

          <p className="mb-4 font-lora text-sm sm:text-base">
          En <strong>Vicnasol</strong> ofrecemos una amplia gama de servicios de mantenimiento de jardines para empresas, comunidades residenciales y particulares, así como mantenimiento de plantas de interior para centros comerciales, oficinas y hoteles, potenciando la imagen corporativa de cara a los clientes.
          </p>

          <ul className="list-disc pl-6 mb-4 font-lora text-justify text-sm sm:text-base">
            <li>
            Desmonte y limpieza de parcelas, taludes, zonas industriales, etc.
            </li>
            <li>
            Poda y tala de árboles mediante técnicas trepadoras y/o camiones grúa, realizadas por profesionales capacitados.
            </li>
            <li>Instalación y reparación de sistemas de riego automático.</li>
            <li>Tratamientos fitosanitarios.</li>
            <li>Control de plagas de hortalizas.</li>
            <li>Proyectos de jardinería.</li>
            </ul>

          <p className="font-lora text-sm sm:text-base">
          En <strong>Vicnasol</strong> nuestro objetivo es dar un servicio integral y de calidad, garantizando la satisfacción del cliente y el cuidado del medio ambiente. Estamos orgullosos de nuestra trayectoria y de la confianza que nuestros clientes han depositado en nosotros a lo largo de los años.
          </p>
        </div>

      <div className="grid grid-cols-1 gap-4 mx-4 my-4 sm:grid-cols-2 lg:grid-cols-3">
        <Image
          src="/images/trabajador.jpg"
          alt="Trabajador"
          width={1800}
          height={920}
          className="sm:min-h-full hover:transform hover:scale-105 transition duration-200 rounded-md"
        />

        <Image
          src="/images/entrada.jpg"
          alt="Trabajador"
          width={1800}
          height={920}
          className="hover:transform hover:scale-105 transition duration-200 rounded-md"
        />

        <Image
          src="/images/rosas.jpg"
          alt="Trabajador"
          width={1800}
          height={920}
          className="hover:transform hover:scale-105 transition duration-200 rounded-md"
        />
      </div>
    </main>
    </div>
  )
}

export default SobreNosotrosCompo




