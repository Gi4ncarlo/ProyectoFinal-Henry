'use client'

import { useState } from 'react'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    edad: '',
    telefono: '',
    ofrecerServicios: false
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>
      <p className="text-gray-600 text-center mb-6">Crea tu cuenta para servicios de jardinería</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input 
              id="nombre" 
              name="nombre" 
              required 
              value={formData.nombre} 
              onChange={handleChange} 
              placeholder="Juan" 
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
            <input 
              id="apellido" 
              name="apellido" 
              required 
              value={formData.apellido} 
              onChange={handleChange} 
              placeholder="Pérez" 
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="ejemplo@correo.com" 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <div className="relative">
            <input 
              id="password" 
              name="password" 
              type={showPassword ? 'text' : 'password'} 
              required 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="••••••••" 
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad</label>
          <input 
            id="edad" 
            name="edad" 
            type="number" 
            required 
            value={formData.edad} 
            onChange={handleChange} 
            placeholder="30" 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input 
            id="telefono" 
            name="telefono" 
            type="tel" 
            required 
            value={formData.telefono} 
            onChange={handleChange} 
            placeholder="123-456-7890" 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input 
            id="ofrecerServicios" 
            name="ofrecerServicios" 
            type="checkbox" 
            checked={formData.ofrecerServicios} 
            onChange={handleChange} 
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="ofrecerServicios" className="text-sm font-medium text-gray-700">
            Quiero ofrecer mis servicios de jardinería
          </label>
        </div>

        <button 
          type="submit" 
          className="w-full mt-4 p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}
