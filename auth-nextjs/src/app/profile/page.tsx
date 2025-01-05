'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Profile() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async () => {
    try {
      //console.log("checking 1");
      
      const res = await axios.post('/api/users/me')
      console.log(res.data);
      setData(res.data.data._id)
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success("logout successfully")
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className='text-5xl'>Profile</h1><br />
      <p className='text-2xl py-4'>Profile page</p>
      <h2 className="p-1 rounded bg-pink-500">{data === "nothing" ? "Nothing" : (
        <Link href={`/profile/${data}`}>
          {data}
        </Link>
      )}</h2>

      <button
      className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={logout}
      >Logout</button>

      <button
      className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={getUserDetails}
      >getUserDetails</button>
    </div>
  )
}
