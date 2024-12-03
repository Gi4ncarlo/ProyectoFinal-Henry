"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { IUserSession } from "@/interfaces/IUserSession";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserData = JSON.parse(localStorage.getItem("userSession") || "null");
      if (storedUserData) {
        setUserData(storedUserData);
        setIsAuthenticated(true);
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    if (userData?.user.isGoogle) {
      Swal.fire({
        title: "¿Seguro que quieres salir?",
        text: "Vas a cerrar sesión",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#388E3C",
        cancelButtonColor: "#FF5722",
        confirmButtonText: "Sí, salir!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("userSession");
          localStorage.removeItem("filter")
          localStorage.removeItem("searchTerm")
          router.push("/api/auth/logout?returnTo=/Home");
          Swal.fire("Sesión cerrada!", "Hasta pronto!", "success");
        }
      });
      return;
    }

    Swal.fire({
      title: "¿Seguro que quieres salir?",
      text: "Vas a cerrar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#388E3C",
      cancelButtonColor: "#FF5722",
      confirmButtonText: "Sí, salir!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userSession");
        localStorage.removeItem("filter")
        localStorage.removeItem("searchTerm")
        Swal.fire("Sesión cerrada!", "Hasta pronto!", "success");
        setUserData(null);
        setIsAuthenticated(false);
        router.push("/");
      } 
    });
  };


  const Dropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleClickOutside = (event: any) => {
    // Cierra el menú si haces clic fuera
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Añadir el evento al montar el componente
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Eliminar el evento al desmontar el componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed z-20 top-0 w-full transition-all duration-500 ${isScrolled
        ? "bg-gradient-to-r from-[#4CAF50] to-[#388E3C] shadow-lg"
        : "bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]"
        }`}
    >
      <div className="container flex items-center justify-between mx-auto px-4 py-3">
        {/* Logo + Text */}
        <div className="flex items-center space-x-3">
          <Link href="/Home">
            <Image
              src="/favicon.ico"
              alt="Logo VICNASOL"
              width={40}
              height={40}
              className="object-contain rounded-full"
              priority={true}
            />
          </Link>
          <div className="text-white text-xl lg:text-3xl font-bold font-cinzel">
            <Link href="/Home" className="hover:text-[#FFEB3B] transition-colors">
              VICNASOL
            </Link>
          </div>
        </div>

        {/* Links (Desktop) */}
        <ul className="hidden lg:flex items-center space-x-6 text-white font-medium">
          <li className="hover:text-[#FFEB3B]">
            <Link href="/servicios">Servicios</Link>
          </li>
          <li className="hover:text-[#FFEB3B]">
            <Link href="/sobreNosotros">Sobre Nosotros</Link>
          </li>
          <li className="hover:text-[#FFEB3B]">
            <Link href="/contacto">Enviar Sugerencia</Link>
          </li>
          <li className="hover:text-[#FFEB3B]">
            <Link href="/gardener">Lista de Jardineros</Link>
          </li>
          {/* {userData?.user.role === "admin" ? (
            <li className="hover:text-[#FFEB3B]">
              <Link href="/registerService">Registrar un nuevo servicio</Link>
            </li>
          ) : null} */}
        </ul>

        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="absolute top-16 right-4 bg-[#388E3C] text-white text-sm font-medium rounded-lg shadow-lg lg:hidden">
            <li className="px-4 py-2 hover:bg-[#4CAF50]">
              <Link href="/servicios">Servicios</Link>
            </li>
            <li className="px-4 py-2 hover:bg-[#4CAF50]">
              <Link href="/sobreNosotros">Sobre Nosotros</Link>
            </li>
            <li className="px-4 py-2 hover:bg-[#4CAF50]">
              <Link href="/contacto">Contacto</Link>
            </li>
            <li className="px-4 py-2 hover:bg-[#4CAF50]">
              <Link href="/gardener">Lista de Jardineros</Link>
            </li>
          </ul>
        )}

        {/* User Menu */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={Dropdown}
          >
            {/* Avatar del usuario */}
            {userData?.user?.profileImageUrl ? (
              <div className="relative w-10 h-10">
                <Image
                  src={userData.user.profileImageUrl}
                  alt="Avatar"
                  className="rounded-full border-2 border-gray-300 hover:border-green-500 transition duration-200"
                  fill // Asegura que ocupe el contenedor
                  sizes="40px" // Tamaño esperado
                />
              </div>
            ) : (
              <div className="relative w-10 h-10">
                <Image
                  src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
                  alt="Avatar"
                  className="rounded-full border-2 border-gray-300 hover:border-green-500 transition duration-200"
                  fill
                  sizes="40px"
                />
              </div>
            )}
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              ref={dropdownRef} 
              className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border-2 border-[#4CAF50] z-50"
              onClick={Dropdown}
            >
              {isAuthenticated ? (
                <div>
                  <Link href="/dashboard">

                    <button className="block px-4 py-2 text-left w-full hover:bg-[#CDDC39] text-gray-700 transition duration-150">
                      Mi Cuenta
                    </button>

                  </Link>
                  <button
                    className="block px-4 py-2 text-left w-full hover:bg-[#CDDC39] text-gray-700 transition duration-150"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div>
                  <Link href="/login">
                    <div className="block px-4 py-2 hover:bg-[#CDDC39] text-gray-700 transition duration-150">
                      Iniciar Sesión
                    </div>
                  </Link>
                  <Link href="/preRegister">
                    <div className="block px-4 py-2 hover:bg-[#CDDC39] text-gray-700 transition duration-150">
                      Registrarse
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
