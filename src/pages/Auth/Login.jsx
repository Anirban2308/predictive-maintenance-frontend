import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
const Login = () => {
  const[formData,setFormData]=useState({
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
      await api.post("/api/v1/auth/login",formData)
      navigate("/home")
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96">
          <h2  className="text-2xl font-semibold mb-6 text-center">Sign in</h2>
          <input
          type='email'
          name='email'
          placeholder='enter email'
          onChange={handleChange}
          className='w-full p-3 mb-3 border rounded-md'
          />
          <input
          type='password'
          name='password'
          placeholder='enter password'
          onChange={handleChange}
          className='w-full p-3 mb-3 border rounded-md'
          />
          <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Log in
        </button>
        <p className="text-sm text-center mt-4">
          Not registered
          <a href='/register'  className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  )
}

export default Login