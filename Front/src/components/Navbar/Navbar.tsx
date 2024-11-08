"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav
      className={`fixed z-10 top-0 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-r from-green-900 to-green-700 opacity-90 lg:py-2"
          : "bg-gradient-to-r from-green-900 to-green-700 py-2 lg:py-4"
      }`}
    >
      <div className="container flex items-center justify-between mx-auto px-2 py-1 lg:px-4 lg:py-2">
        {/* Logo */}
        <div
          className={`text-white text-lg lg:text-3xl font-bold font-cinzel ${
            isScrolled ? "text-base lg:text-2xl" : ""
          }`}
        >
          <Link href="/">VICNASOL</Link>
        </div>

        {/* Links aligned to the center on large screens */}
        <ul
          className={`hidden lg:flex items-center space-x-6 text-white text-base lg:text-xl font-roboto ${
            isScrolled ? "text-[10px] lg:text-[18px] duration-700" : ""
          } mx-auto`}
        >
          <li className="hover:-translate-y-1 hover:underline">
            <Link href="services">Services</Link>
          </li>
          <li className="hover:-translate-y-1 hover:underline">
            <Link href="aboutUs">About Us</Link>
          </li>
          <li className="hover:-translate-y-1 hover:underline">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Buttons for Register and Login */}
        <div className="hidden lg:flex space-x-4">
          <Link href="/register">
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
              Register
            </button>
          </Link>
          <Link href="/login">
            <button className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white text-lg lg:text-3xl">
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {isMenuOpen && (
          <ul className="absolute top-16 right-4 bg-green-700 text-white text-base lg:text-xl font-roboto space-y-4 p-4 rounded-lg lg:hidden">
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="services">Services</Link>
            </li>
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="aboutUs">About Us</Link>
            </li>
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="/contact">Contact</Link>
            </li>
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="/register">Register</Link>
            </li>
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
