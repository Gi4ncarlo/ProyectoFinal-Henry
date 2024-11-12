// src/views/PreHomeView.tsx
import Link from "next/link";
import Image from "next/image";

const PreHomeView = () => {
  return (
    <div className="relative h-screen w-screen">
      {/* Imagen de fondo */}
      <Image
        src="/images/fondo_landingPage.jpg" // Reemplaza por el nombre exacto de tu archivo
        alt="Fondo de bienvenida"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay y botón */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-8">
          ¡Bienvenido a Vicnasol!
        </h1>
        <Link href="/Home">
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-300">
            Entrar al Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PreHomeView;
