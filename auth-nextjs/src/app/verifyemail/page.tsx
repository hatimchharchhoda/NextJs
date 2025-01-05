'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
   const [token, setToken] = useState("")
   const [verifiedEmail, setEmailVerified] = useState(false)
   const [error, setError] = useState(false)

   const verifyUser = async () => {
      try {
         await axios.post("api/users/verify", {token})
         setEmailVerified(true)

      } catch (error: any) {
         setError(true)
         console.log(error.response.data);
      }
   }

   useEffect(() => {
      setError(false)
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "")
   },[])

   useEffect(() => {
      setError(false)
      if(token.length > 0){
         verifyUser()
      }
   }, [token])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "No token"}</h2>
      {verifiedEmail && (
         <div>
            <h2 className="text-2xl">Verified Successfully</h2>
            <Link href="/login">
               login
            </Link>
         </div>
      )}
      {error && (
         <div >
            <h2 className="text-2xl bg-red-500 text-black">Invalid Token error found</h2>
         </div>
      )}
    </div>
  )
}
