import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../store/userAuthStore'

const signup = () => {

  const {signup }=  useAuthStore()

const [formdata , setformdata ] = useState({
  username:"",
  email:"",
  password:"",

})
const handlechange=(e)=>{
     const {name , value} = e.target
    setformdata({
      ...formdata,
      [name]:value
    })
}
const btnSubmit = ()=>{
  signup(formdata)
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      {/* Form */}
      <form className="space-y-5">

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            onChange={handlechange}
            name='username'
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            onChange={handlechange}
            name='email'
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={handlechange}
            name='password'
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Signup Button */}
        <button
          type="button"
          onClick={btnSubmit}
          className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Sign Up
        </button>

      </form>

      {/* Divider */}
     
      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <Link className="text-green-600 font-semibold hover:underline" to="/login">
          Login
        </Link>
      </p>

    </div>
  </div>
  )
}

export default signup
