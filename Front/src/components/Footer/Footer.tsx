import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white p-4">
      <div className="grid grid-cols-1 gap-4 mx-4 my-2 sm:grid-cols-2 lg:grid-cols-3">
        <ul className="lg:pr-8 text-center sm:pr-0 lg:text-left"> 
          <li className="font-nunito text-lg py-1 lg:text-lg md:text-base sm:text-sm">
            Transforming green spaces, taking care of every detail.
          </li>
    
          <li className="font-lato text-base lg:text-base md:text-sm sm:text-xs">
            🌿 Location: Av. Las Flores 1234, Garden City, Green Province
          </li>
    
          <li className="font-lato text-base lg:text-base md:text-sm sm:text-xs">
            📞 Phone: +54 9 11 1234-5678
          </li>
    
          <li className="font-lato text-base lg:text-base md:text-sm sm:text-xs">
            📧 Email: contact@vicnasol.com
          </li>
    
          <li className="font-lato text-base lg:text-base md:text-sm sm:text-xs">
            ⏰ Work Hours: Monday to Friday, 8:00 AM - 6:00 PM
          </li>
        </ul>
    
        <p className="text-xl font-cinzel font-medium m-auto text-center lg:text-lg md:text-base sm:text-sm">
          &copy; 2010 Vicnasol. All rights reserved.
        </p>
    
        <ul className="space-x-6 m-auto flex sm:justify-center lg:justify-start">
          <li className="transform transition-transform duration-300 hover:scale-110">
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/LogosFacebook.png"}
                alt="Facebook"
                width={40}
                height={40}
                className="mx-auto"
              />
              <p className="font-nunito mt-2">Facebook</p>
            </Link>
          </li>
    
          <li className="transform transition-transform duration-300 hover:scale-110 mx-auto">
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/LogoInstagram.png"}
                alt="Instagram"
                width={40}
                height={40}
                className="mx-auto"
              />
              <p className="font-nunito mt-2">Instagram</p>
            </Link>
          </li>
    
          <li className="transform transition-transform duration-300 hover:scale-110">
            <Link
              href="https://wa.me/5492944777103?text=Hello, I want information about your business"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/images/LogosWhatsappIcon.png"}
                alt="Whatsapp"
                width={40}
                height={40}
                className="mx-auto"
              />
              <p className="font-nunito mt-2">Whatsapp</p>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
