'use client';

import { register } from '@/helpers/auth.helpers';
import { validateRegisterForm } from '@/helpers/validate';
import { IRegisterErrors, IRegisterProps } from '@/interfaces/IRegisterProps';
import { useRouter } from 'next/navigation';
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
    offerServices: false, // Inicialización correcta
  };

  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    username: false,
    password: false,
    passwordConfirm: false,
    age: false,
    address: false,
    phone: false,
    offerServices: false,
  });

  // Manejo del cambio en los campos
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  // Manejo de envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const validationErrors = validateRegisterForm(dataUser);
    setErrors(validationErrors);
  
    // Verificamos si no hay errores antes de registrar
    if (Object.keys(validationErrors).length === 0) {
      // Creamos una copia de dataUser con age convertido a número
      const userToSend = {
        ...dataUser,
        age: Number(dataUser.age),
      };
  
      await register(userToSend);
      alert("Correct Register");
      router.push('/login');
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
      <h2 className="text-2xl font-bold text-center mb-4">Registrate como usuario</h2>
      <p className="text-gray-600 text-center mb-6">Crea tu cuenta y disfruta de nuestros servicios</p>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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


        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">Confirmar Password</label>
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

        <div className="flex items-center space-x-2">
          <input
            id="offerServices"
            name="offerServices"
            type="checkbox"
            checked={dataUser.offerServices}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>

    
        <button type="submit" disabled={Object.values(errors).some(error => error !== "")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Registrarme como usuario
      </button>
      </form>
    </div>
  )
}
