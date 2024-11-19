'use client';

import { checkEmailBeforeRegister, register } from '@/helpers/auth.helpers';
import { validateRegisterForm } from '@/helpers/validate';
import { IRegisterErrors, IRegisterProps } from '@/interfaces/IRegisterProps';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function RegisterForm() {
  const router = useRouter();

  // Definimos el estado inicial para dataUser
  const initialState: IRegisterProps = {
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    age: 0,
    address: "",
    phone: "",
    role: "", // Campo para el rol (cliente o jardinero)
  };

  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    username: false,
    password: false,
    passwordConfirm: false,
    age: false,
    address: false,
    phone: false,
    role: false, 
  });


  const searchParams = useSearchParams(); // Hook para leer parámetros de la URL
  const role = searchParams?.get('role'); // Obtén el valor del parámetro "role"
  
  const [title, setTitle] = useState("");

  // Cambiar dinámicamente el título basado en el parámetro
  useEffect(() => {
    if (role === 'cliente') {
      setTitle("Regístrate como Cliente");
    } else if (role === 'jardinero') {
      setTitle("Regístrate como Jardinero");
    }
  }, [role]);




  // Manejo del cambio en los campos
  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setDataUser({
      ...dataUser,
      [name]: name === 'age' ? Number(value) : type === 'checkbox' ? checked : value,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const validationErrors = validateRegisterForm(dataUser);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      console.log("Email mandado: ", dataUser.email);
      const emailValid = await checkEmailBeforeRegister(dataUser);
      console.log("Email: ", emailValid);
      
      if (!emailValid) {
        setErrors((prev: any) => ({
          ...prev,
          email: "Este correo ya está registrado.",
        }));
        return;
      }
  
      try {
        await register(dataUser);
        alert("Registro exitoso");
        router.push("/login");
      } catch (error) {
        alert(error);
      }
    }
  };
  

  // Validación en tiempo real al cambiar `dataUser` o `touched`
  useEffect(() => {
    if (Object.values(touched).some(field => field)) {
      const validationErrors = validateRegisterForm(dataUser);
      setErrors(validationErrors);
    }
  }, [dataUser, touched]);

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-24 p-6 border rounded-lg shadow-lg bg-white">
 <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <p className="text-gray-600 text-center mb-6">Crea tu cuenta y disfruta de nuestros servicios</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            name="name"
            required
            value={dataUser.name}
            onChange={handleChange}
            placeholder="John"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {touched.name && errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

        {/* Usuario */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
          <input
            id="username"
            name="username"
            required
            value={dataUser.username}
            onChange={handleChange}
            placeholder="john_doe"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {touched.username && errors.username && (
            <span className="text-red-500 text-sm">{errors.username}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={dataUser.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {touched.email && errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={dataUser.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {touched.password && errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type={showPassword ? 'text' : 'password'}
            required
            value={dataUser.passwordConfirm}
            onChange={handleChange}
            placeholder="••••••••"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <span className="text-red-500 text-sm">{errors.passwordConfirm}</span>
          )}
        </div>

        {/* Edad */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            id="age"
            name="age"
            type="number"
            required
            value={dataUser.age}
            onChange={handleChange}
            placeholder="30"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {touched.age && errors.age && (
            <span className="text-red-500 text-sm">{errors.age}</span>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={dataUser.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {touched.phone && errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            id="address"
            name="address"
            required
            value={dataUser.address}
            onChange={handleChange}
            placeholder="123 Garden St."
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {touched.address && errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>

        {/* Selección de rol */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">¿Eres Cliente o Jardinero?</label>
          <select
            id="role"
            name="role"
            value={dataUser.role}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Selecciona un rol</option>
            <option value="user">Usuario</option>
            <option value="gardener">Jardinero</option>
          </select>
          {touched.role && errors.role && (
            <span className="text-red-500 text-sm">{errors.role}</span>
          )}
        </div>
        <button type="submit" disabled={Object.values(errors).some(error => error !== "")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Registrarme como {role}
        </button>
      </form>
    </div>
  );
}
