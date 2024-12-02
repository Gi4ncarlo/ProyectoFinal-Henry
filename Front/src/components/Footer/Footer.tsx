import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#4CAF50] text-white py-8 px-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {/* Información de contacto */}
        <ul className="text-center lg:text-left">
          <li className="text-lg py-2">
            Transformando espacios verdes, cuidando cada detalle.
          </li>
          <li className="text-sm py-1">
            📞 Teléfono: +54 9 11 1234-5678
          </li>
          <li className="text-sm py-1">
            📧 Correo electrónico: hpfinal21@gmail.com
          </li>
        </ul>

        {/* Derechos reservados */}
        <p className="text-center font-medium text-base lg:text-lg">
          &copy; Vicnasol <br></br> Te conectamos con lo que buscas !
        </p>

        {/* Redes sociales */}
        <ul className="flex justify-center space-x-6 lg:justify-middle">
          {/* Facebook */}
          <li className="transform transition-transform duration-300 hover:scale-110">
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/LogosFacebook.webp"}
                alt="Facebook"
                width={40}
                height={40}
                className="rounded-full mx-auto"
              />
              <span className="text-sm mt-2 block text-center">
                Facebook
              </span>
            </Link>
          </li>

          {/* Instagram */}
          <li className="transform transition-transform duration-300 hover:scale-110">
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/LogoInstagram.webp"}
                alt="Instagram"
                width={40}
                height={40}
                className="rounded-full mx-auto"
              />
              <span className="text-sm mt-2 block text-center">
                Instagram
              </span>
            </Link>
          </li>

          {/* WhatsApp */}
          <li className="transform transition-transform duration-300 hover:scale-110">
            <Link
              href="https://wa.me/5492944777103?text=Hola, me gustaria saber mas sobre Vicnasol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/LogosWhatsappIcon.webp"}
                alt="WhatsApp"
                width={40}
                height={40}
                className="rounded-full mx-auto"
              />
              <span className="text-sm mt-2 block text-center">
                WhatsApp
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
