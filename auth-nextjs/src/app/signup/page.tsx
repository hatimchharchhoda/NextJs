'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function Signup() {
  const router = useRouter()
   const [user, setUser] = useState({
      userName: "",
      email: "",
      password: ""
   })

   const [buttonDisabled, setButtonDisabled] = useState(false)
   const [loading, setLoading] = useState(false)

   const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("signing successfully: ",response.data);
      router.push('/login')

    } catch (error: any) {
      console.log("signup failed");
      toast.error(error.message)
    }
   }

   useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.userName.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
   },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "processing...": "SignUp"}</h1><br/>
      <label htmlFor="username">UserName</label>
      <input 
      id='username'
      type="text"
      value={user.userName}
      onChange={(e) => setUser({...user, userName: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      placeholder="Enter your name"
      />
      <label htmlFor="email">Email</label>
      <input 
      id='email'
      type="email"
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      placeholder="Enter your email"
      />
      <label htmlFor="password">Password</label>
      <input 
      id='username'
      type="password"
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      placeholder="Enter your password"
      />
      <button
      onClick={onSignup}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
        {buttonDisabled ? "No Signup" : "Signup" }
      </button>
      <Link href="/login">Click to Login</Link>
    </div>
  )
}
