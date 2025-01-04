import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server'
import User from "@/models/userModel"
import bcryptjs from 'bcryptjs'
import { sendMail } from "@/helper/mailer";

connect()

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json()
      console.log("reqbody found : ", reqBody);
      
      const {userName, email, password} =reqBody

      //validation
      console.log(reqBody);
      
      const user = await User.findOne({email})

      if(user){
         return NextResponse.json({error: 'User already exists', status: 400})
      }

      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)
      console.log("hashedpassword done");
      
      const newUser = new User({
         userName,
         email,
         password: hashedPassword
      })
      const savedUser = await newUser.save()
      console.log("newUser has been saved", savedUser);
      
      await sendMail({email, emailType:"Verify", userId: savedUser._id})
      return NextResponse.json({
         message: 'User created successfully',
         success: true,
         savedUser
      })

   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500})
   }
}