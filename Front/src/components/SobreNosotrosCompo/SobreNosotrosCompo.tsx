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
            <strong>Vicnasol</strong> is an environmental services company with over 30 years of experience, located in Carrasco, Montevideo, and Ciudad de la Costa, Uruguay. We specialize in all gardening work, offering customized solutions to meet the needs of individuals and companies looking for quality service. Our team of 10 highly qualified professionals will advise and guide you through every stage of your project.
          </p>

          <div className="relative bg-gray-200 p-6 pl-10 mb-6 border-l-8 border-green-700 font-lora">
            <span className="absolute left-0 top-0 text-6xl text-green-700 leading-none font-playfair">
              “
            </span>
            <p className="text-lg italic">
              At Vicnasol, we bring your ideas to life. From the first meeting to the completion of each project, we dedicate ourselves to ensuring not a single detail is overlooked.
            </p>
            <span className="absolute right-0 bottom-0 text-6xl text-green-700 leading-none font-playfair">
              ”
            </span>
          </div>

          <p className="mb-4 font-lora text-sm sm:text-base">
            At <strong>Vicnasol</strong>, we offer a wide range of garden maintenance services for businesses, residential communities, and individuals, as well as indoor plant maintenance for shopping centers, offices, and hotels, enhancing corporate image for clients.
          </p>

          <ul className="list-disc pl-6 mb-4 font-lora text-justify text-sm sm:text-base">
            <li>
              Clearing and cleaning of plots, slopes, industrial areas, etc.
            </li>
            <li>
              Pruning and tree felling using climbing techniques and/or crane trucks, performed by trained professionals.
            </li>
            <li>Installation and repair of automatic irrigation systems.</li>
            <li>Phytosanitary treatments.</li>
            <li>Vegetable pest control.</li>
            <li>Gardening projects.</li>
          </ul>

          <p className="font-lora text-sm sm:text-base">
            At <strong>Vicnasol</strong>, our goal is to provide a comprehensive, high-quality service, ensuring customer satisfaction and environmental care. We take pride in our track record and the trust our clients have placed in us over the years.
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




