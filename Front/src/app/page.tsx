"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { images } from "../app/lib/images";
import { BentoGridThirdDemo } from "../app/intentoBendo";
import Link from "next/link";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const Home = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <main className="bg-green-50">
      {/* <section className="relative w-full h-64 md:h-96 lg:h-[400px] overflow-hidden">
        <Image
          src="/images/fondopagprincipal.jpg"
          alt="Fondo principal"
          fill
          className="object-cover object-center"
        />
      </section> */}

       <section className="py-12 mt-8 lg:mt-14">
        <div className="container mx-auto">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-64 md:h-96 w-full rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail */}
          <Swiper
            loop={true}
            spaceBetween={12}
            slidesPerView={2}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs mt-3 h-24 md:h-32 w-full rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <button className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="bg-green-800 p-8 max-w-screen-3xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col lg:h-96 justify-between">
            <h1 className="text-xl xl:text-3xl font-bold text-green-700 mb-4 text-center">
              Empresa Vicnasol de Jardinería
            </h1>
            <p className="text-sm xl:text-lg mb-4">
              Bienvenido a Vicnasol: Tu Socio en Jardinería. Nos dedicamos con
              pasión a embellecer tus espacios verdes, ofreciendo servicios de
              diseño, mantenimiento y construcción de jardines.
            </p>
            <p className="text-sm xl:text-lg mb-4">
              Nuestro compromiso con la calidad se refleja en cada proyecto.
              Desde el cuidado de cada planta hasta el diseño creativo de
              paisajes, aseguramos que cada detalle sea perfecto.
            </p>
            <p className="text-sm xl:text-lg mb-4">
              Descubre cómo podemos transformar tu entorno con profesionalismo y
              estilo. Conoce nuestra historia y valores.
            </p>
            <div className="text-center">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Ver más
              </button>
            </div>
          </div>
          <div className="relative w-full h-64 lg:h-96 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/images/rosas.jpg"
              alt="Fondo principal"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <hr />

      {/* Bento Section */}
      <section className="min-h-[800px]">
        <BentoGridThirdDemo />
      </section>
    </main>
  );
};


export default Home;
