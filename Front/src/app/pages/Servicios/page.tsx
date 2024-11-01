'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const Services = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className={`bg-green-50 py-12 ${
      isScrolled 
      ? "pb-8 lg:mt-4"
      : "pb-16 lg:mt-8"
    }`}>
      
      <div className="fixed w-full">
        <nav className="text-center p-4 w-full bg-gradient-to-r from-green-600 to-green-100 opacity-90 mb-12">
          <ul className="flex justify-center space-x-6 text-sm text-white lg:text-2xl">
            <li>
              <a href="#MantenimientoJ" className="hover:text-green-300 transition-colors duration-300">
                Mantenimiento de Jardines
              </a>
            </li>
            <li>
              <a href="#Paisajismo" className="hover:text-green-300 transition-colors duration-300">
                Paisajismo
              </a>
            </li>
            <li>
              <a href="#Empresas" className="hover:text-green-300 transition-colors duration-300">
                Empresas
              </a>
            </li>
            <li>
              <a href="#Riego" className="hover:text-green-300 transition-colors duration-300">
                Riego
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <hr id="MantenimientoJ" className="mb-24 border-green-50 opacity-50" />
      
      <section className="mt-14 lg:mt-24">
        <div className="grid grid-cols-1 max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="lg:p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">Mantenimiento de Jardines</h2>
            <p className="text-lg text-justify mb-6">
              Mantener tu jardín en perfecto estado es nuestra prioridad. Ofrecemos servicios de poda, fertilización y cuidado integral para asegurar que tu espacio verde luzca siempre impecable. Con técnicas avanzadas y un equipo experto, cuidamos cada detalle.
            </p>
          </div>
            <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:p-6 lg:shadow-xl lg:rounded-lg'>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className='rounded-lg shadow-md'
            />
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            </div>
        </div>
      </section>

      <hr id="Paisajismo" className="my-24 border-green-900 opacity-50"/>
      
      <section className="lg:mt-24">
        <div className="grid grid-cols-1 max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="lg:p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">Paisajismo</h2>
            <p className="text-lg text-justify mb-6">
              Transformamos tus espacios con proyectos de paisajismo que combinan creatividad, funcionalidad y estética. Diseñamos jardines que no solo embellecen, sino que también optimizan el uso del terreno y la sostenibilidad del entorno.
            </p>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:p-6 lg:shadow-xl lg:rounded-lg'>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            </div>
        </div>
      </section>

      <hr id="Empresas" className="my-24 border-green-900 opacity-50"/>
      
      <section className="lg:mt-24">
        <div className="grid grid-cols-1 max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="lg:p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">Empresas</h2>
            <p className="text-lg text-justify mb-6">
              Ofrecemos soluciones especializadas para empresas, asegurando que sus espacios verdes reflejen profesionalismo y compromiso con el medio ambiente. Nos encargamos del diseño, instalación y mantenimiento de áreas verdes corporativas.
            </p>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:p-6 lg:shadow-xl lg:rounded-lg'>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            </div>
        </div>
      </section>

      <hr id="Riego" className="my-24 border-green-900 opacity-50"/>
      
      <section className="lg:mt-24">
        <div className="grid grid-cols-1 max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="lg:p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">Sistemas de Riego</h2>
            <p className="text-lg text-justify mb-6">
              Instalamos sistemas de riego eficientes que se adaptan a las necesidades de tu jardín o área verde. Automatización y optimización del agua garantizan que cada planta reciba la cantidad exacta de hidratación.
            </p>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:p-6 lg:shadow-xl lg:rounded-lg'>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Mantenimiento de jardines"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Services;