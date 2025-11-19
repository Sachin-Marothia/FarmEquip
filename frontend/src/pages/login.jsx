import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useEffect } from 'react'
import { useAuthStore } from '../store/userAuthStore'
const login = () => {

   const {signin} = useAuthStore()
  const [formData , setformData] = useState({
    email:"",
    password:""
  })
  const handleChange =(e)=>{
    const {name,value}=e.target
     setformData({
      ...formData,
      [name]:value
     })
  }

  const btnSubmit =()=>{
        signin(formData)
  } 
  return (
    <div>
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name='email'
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"

              name='password'
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            onClick={btnSubmit}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

     

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            className="text-blue-600 font-semibold hover:underline"
            to="/signup"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default login
