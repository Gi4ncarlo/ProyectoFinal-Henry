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
        <h1 className="text-xl font-bold mb-1 font-playfair sm:text-2xl lg:text-4xl lg:mb-6">Quiénes somos</h1>
        <p className="mb-4 font-lora text-sm sm:text-base">
          <strong>Vicnasol</strong> es una empresa de servicios medioambientales
          con más de 30 años de experiencia, ubicada en Carrasco, Montevideo y
          Ciudad de la Costa, Uruguay. Nos especializamos en todas las labores
          de jardinería, ofreciendo soluciones a medida para satisfacer las
          necesidades tanto de personas como de empresas que buscan un servicio
          de calidad. Contamos con un equipo de 10 profesionales altamente
          cualificados, quienes le asesorarán y guiarán en cada etapa de su
          proyecto.
        </p>

        <div className="relative bg-gray-200 p-6 pl-10 mb-6 border-l-8 border-green-700 font-lora">
          <span className="absolute left-0 top-0 text-6xl text-green-700 leading-none font-playfair">
            “
          </span>
          <p className="text-lg italic">
            En Vicnasol, hacemos que sus ideas se materialicen. Desde el primer
            encuentro hasta el final de cada proyecto, ponemos todo nuestro
            empeño para que no se escape ni un solo detalle.
          </p>
          <span className="absolute right-0 bottom-0 text-6xl text-green-700 leading-none font-playfair">
            ”
          </span>
        </div>

        <p className="mb-4 font-lora text-sm sm:text-base">
          En <strong>Vicnasol</strong> ofrecemos una amplia gama de servicios de
          mantenimiento de jardines para empresas, comunidades de propietarios y
          particulares, así como servicios de mantenimiento de plantas de
          interior en centros comerciales, oficinas y hoteles, mejorando la
          imagen corporativa de cara a los clientes.
        </p>

        <ul className="list-disc pl-6 mb-4 font-lora text-justify text-sm sm:text-base">
          <li>
            Trabajos de desbroces y limpieza de parcelas, taludes, polígonos
            industriales, etc.
          </li>
          <li>
            Podas y talas mediante técnicas de trepa y/o con camión grúa,
            realizadas por profesionales formados.
          </li>
          <li>Instalación y reparación de riegos automáticos.</li>
          <li>Tratamientos fitosanitarios.</li>
          <li>Control de plagas vegetales.</li>
          <li>Obras de jardinería.</li>
        </ul>

        <p className="font-lora text-sm sm:text-base">
          En <strong>Vicnasol</strong>, nuestro objetivo es proporcionar un
          servicio integral y de alta calidad, asegurando la satisfacción de
          nuestros clientes y el cuidado del medio ambiente. Nos enorgullecemos
          de nuestra trayectoria y de la confianza que nuestros clientes han
          depositado en nosotros a lo largo de los años.
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




