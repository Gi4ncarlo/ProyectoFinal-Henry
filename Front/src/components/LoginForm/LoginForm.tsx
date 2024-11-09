'use client'

import { login } from '@/helpers/auth.helpers'
import { validateLoginForm } from '@/helpers/validate';
import { ILoginErrors, ILoginProps } from '@/interfaces/ILoginProps';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function LoginForm() {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<ILoginErrors>(initialState);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataUser({
      ...dataUser,
      [name]: value,
    });
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await login(dataUser);
    console.log(response);

    if (response.statusCode === 400) {
      alert(response.message || "error register")
    } else {
      alert("Correct login");
      const { token, user } = response;
      localStorage.setItem("userSession", JSON.stringify({ token, user }));
      router.push('/');
    }
  };

  useEffect(() => {
    if (Object.values(touched).some(field => field)) {
      const validationErrors = validateLoginForm(dataUser);
      setErrors(validationErrors)
    }
  }, [dataUser, touched])


  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <p className="text-gray-600 text-center mb-6">Access your account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
           {touched.email && errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={dataUser.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {touched.password && errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>
        </div>

        <button
          type="submit"
          disabled={Object.values(errors).some(error => error !== "")}
          className="w-full mt-4 p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}
