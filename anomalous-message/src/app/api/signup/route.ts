import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerification } from "@/helpers/sendVerificatonEmail";

export async function POST(request: Request){
   await dbConnect()
   try {
      const {username, email, password} = await request.json()

      const exsistingUserByUsername = await UserModel.findOne({username: username, isVerified: true})
      
      if(exsistingUserByUsername){
         return Response.json({message: "Username already taken",success: false}, {status: 400})
      }

      const existingUserByEmail = await UserModel.findOne({email: email})
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      if(existingUserByEmail){
         if(existingUserByEmail.isVerified) {
            return Response.json({
               success: true,
               message: "User is already registered with this email. Try to login."
            },{status: 200})
         } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            existingUserByEmail.password = hashedPassword;
            existingUserByEmail.verifiedCode = verifyCode;
            existingUserByEmail.verifiedCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserByEmail.save()
         }
      } else {
         const hashedPassword = await bcrypt.hash(password, 10)
         const expiryDate = new Date();
         expiryDate.setHours(expiryDate.getHours() + 1)

         const newUser = new UserModel({
            username: username,
            email: email,
            password: hashedPassword,
            verifiedCode: verifyCode,
            verifiedCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            message: []
         })
         await newUser.save()
      }

      // sending email and checking response
      const emailResponse = await sendVerification(email, username ,verifyCode)

      if(!emailResponse.success){
         return Response.json({
            success: false,
            message: emailResponse.message
         }, {status: 500})
      }

      return Response.json({
         success: true,
         message: "Email has been send successfully. Please check your mail for verification"
      },{status: 200})

   } catch (error) {
      console.log("Error registering user ", error);
      return Response.json({
         success: false,
         message: "Error registering user"
      },
      {
         status: 500
      })
   }
}