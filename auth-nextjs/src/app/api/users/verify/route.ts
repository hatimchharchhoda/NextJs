import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server'
import User from "@/models/userModel"

connect()

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json()
      const {token} = reqBody

      const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
      if(!user){
         return NextResponse.json({message: "user token not verified", status: 500})
      }
      console.log(user);
      
      user.isVerified = true
      user.verifyTokenExpiry = undefined
      user.verifyToken = undefined
      await user.save()

      return NextResponse.json({message: "user verified successfully", status: 200})
      
   } catch (error: any)
   {
      return NextResponse.json({message: error.message, status: 500})
   }
}