import React from 'react'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Signup = () => {
    const[formData,setFormData]=useState({
        fullName:"",
        email:"",
        password:"",
})
const[error,setError]=useState("")
const navigate=useNavigate()

const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}
const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        await api.post("/api/v1/auth/register",formData)
        alert("successful login")
        navigate("/home")
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
    }
}
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  )
}

export default Signup