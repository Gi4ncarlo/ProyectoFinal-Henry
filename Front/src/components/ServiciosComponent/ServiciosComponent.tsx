'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const ServicesComponent = () => {
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
              <a href="#GardenMaintenance" className="hover:text-green-300 transition-colors duration-300">
                Garden Maintenance
              </a>
            </li>
            <li>
              <a href="#Landscaping" className="hover:text-green-300 transition-colors duration-300">
                Landscaping
              </a>
            </li>
            <li>
              <a href="#Corporate" className="hover:text-green-300 transition-colors duration-300">
                Corporate
              </a>
            </li>
            <li>
              <a href="#Irrigation" className="hover:text-green-300 transition-colors duration-300">
                Irrigation
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <hr id="GardenMaintenance" className="mb-24 border-green-50 opacity-50" />
      
      <section className="mt-14 lg:mt-24">
        <div className="grid grid-cols-1 max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="lg:p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">Garden Maintenance</h2>
            <p className="text-lg text-justify mb-6">
              Keeping your garden in perfect condition is our priority. We offer pruning, fertilizing, and comprehensive care services to ensure your green space always looks impeccable. With advanced techniques and an expert team, we take care of every detail.
            </p>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:p-6 lg:shadow-xl lg:rounded-lg'>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Garden maintenance"
              width={1920}
              height={1080}
              className='rounded-lg shadow-md'
            />
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Garden maintenance"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Garden maintenance"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
            <div className=''>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Garden maintenance"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            </div>
          </div>
        </div>
      </section>

      <hr id="Landscaping" className="my-24 border-green-900 opacity-50"/>
      
      <section className="lg:mt-24">
        <div className="grid grid-cols-1 max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="lg:p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">Landscaping</h2>
            <p className="text-lg text-justify mb-6">
              We transform your spaces with landscaping projects that combine creativity, functionality, and aesthetics. We design gardens that not only beautify but also optimize land use and environmental sustainability.
            </p>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:p-6 lg:shadow-xl lg:rounded-lg'>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Landscaping"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Landscaping"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Landscaping"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Landscaping"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <hr id="Corporate" className="my-24 border-green-900 opacity-50"/>
      
      <section className="lg:mt-24">
        <div className="grid grid-cols-1 max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="lg:p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">Corporate</h2>
            <p className="text-lg text-justify mb-6">
              We offer specialized solutions for businesses, ensuring their green spaces reflect professionalism and commitment to the environment. We handle the design, installation, and maintenance of corporate green areas.
            </p>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:p-6 lg:shadow-xl lg:rounded-lg'>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Corporate maintenance"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Corporate maintenance"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Corporate maintenance"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Corporate maintenance"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <hr id="Irrigation" className="my-24 border-green-900 opacity-50"/>
      
      <section className="lg:mt-24">
        <div className="grid grid-cols-1 max-w-7xl mx-auto p-6 lg:grid lg:grid-cols-2 lg:items-center">
          <div className="lg:p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-4">Irrigation Systems</h2>
            <p className="text-lg text-justify mb-6">
              We install efficient irrigation systems that adapt to the needs of your garden or green area. Automation and water optimization ensure each plant receives the exact amount of hydration needed.
            </p>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 lg:p-6 lg:shadow-xl lg:rounded-lg'>
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Irrigation systems"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Irrigation systems"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Irrigation systems"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/images/fondo_contacto.jpg"
              alt="Irrigation systems"
              width={1920}
              height={1080}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesComponent;
