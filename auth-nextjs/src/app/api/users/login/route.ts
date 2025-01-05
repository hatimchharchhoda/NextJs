import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server'
import User from "@/models/userModel"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
   try {
      const reqBody = await request.json()
      console.log("reqbody found : ", reqBody);
      
      const {email, password} =reqBody

      //validation
      console.log(reqBody);

      const user = await User.findOne({email})
      if(!user){
         return NextResponse.json({ message: "email not found check your email or signup"}, {status: 400})
      }
      console.log("user exists");

      const validPassword = await bcryptjs.compare(password, user.password)
      if(!validPassword){
         return NextResponse.json({ message: "password is incorrect"}, {status: 400})
      }

      const tokenData = {
         id: user._id,
         email: user.email,
         password: user.password
      }
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d'})

      const response = NextResponse.json({message: "logged in successfully"}, {status: 200})

      response.cookies.set("token", token, {
         httpOnly: true
      })
      return response

   } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 })
   }
}