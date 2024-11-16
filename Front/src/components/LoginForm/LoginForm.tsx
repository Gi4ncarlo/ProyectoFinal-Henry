"use client";

import { login } from "@/helpers/auth.helpers";
import { validateLoginForm } from "@/helpers/validate";
import { ILoginErrors, ILoginProps } from "@/interfaces/ILoginProps";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ILoginErrors>(initialState);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await login(dataUser);
    if (response.status === 401) {
      Swal.fire({
        title: "Error",
        text: "Email o contraseña incorrectos",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Bienvenido!",
        text: "Ingresaste correctamente",
        icon: "success",
      });
      const { token, user } = response;
      localStorage.setItem("userSession", JSON.stringify({ token, user }));
      router.push("/Home");
    }
  };

  useEffect(() => {
    if (Object.values(touched).some((field) => field)) {
      const validationErrors = validateLoginForm(dataUser);
      setErrors(validationErrors);
    }
  }, [dataUser, touched]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen relative flex items-center justify-center">
      {/* Imagen de fondo optimizada */}
      <Image
        src="/images/fondoLogin.jpg" 
        alt="Fondo de bienvenida"
        layout="fill" 
        objectFit="cover"
        priority // Asegura que la imagen se cargue rápidamente
        quality={100} // Alta calidad (ajusta según tus necesidades)
      />

      {/* Contenedor del formulario */}
      <div className="relative w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white z-10">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#263238]">
          Inicia sesión
        </h2>
        <p className="text-[#388e3c] text-center mb-6">Accede a tu cuenta</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={dataUser.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="mt-1 p-2 border border-[#8bc34a] rounded w-full"
            />
            {touched.email && errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={dataUser.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 p-2 border border-[#8bc34a] rounded w-full"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
              {touched.password && errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={Object.values(errors).some((error) => error !== "")}
            className="w-full mt-4 p-2 bg-[#4caf50] text-white font-bold rounded hover:bg-[#388e3c]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
