'use client'

import { useState } from 'react'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    age: '',
    phone: '',
    address: '',
    offerServices: false
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
    <div className="w-full max-w-md mx-auto mt-24 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <p className="text-gray-600 text-center mb-6">Create your account</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            id="name" 
            name="name" 
            required 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="John" 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input 
            id="username" 
            name="username" 
            required 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="john_doe" 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="example@mail.com" 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input 
            id="age" 
            name="age" 
            type="number" 
            required 
            value={formData.age} 
            onChange={handleChange} 
            placeholder="30" 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input 
            id="phone" 
            name="phone" 
            type="tel" 
            required 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="123-456-7890" 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input 
            id="address" 
            name="address" 
            required 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="123 Garden St." 
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input 
            id="offerServices" 
            name="offerServices" 
            type="checkbox" 
            checked={formData.offerServices} 
            onChange={handleChange} 
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="offerServices" className="text-sm font-medium text-gray-700">
            I want to offer my gardening services
          </label>
        </div>

        <button 
          type="submit" 
          className="w-full mt-4 p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}
