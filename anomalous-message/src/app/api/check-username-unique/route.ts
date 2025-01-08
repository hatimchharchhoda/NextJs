import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
   username: usernameValidation
})

export async function GET(request: Request){
   await dbConnect()
   try {
      const { searchParams } = new URL(request.url)
      const query = {
         username: searchParams.get('username')
      }

      //validate username
      const result = UsernameQuerySchema.safeParse(query)
      console.log(result);
      if(!result.success) {
         const usernameError = result.error.format().username?._errors || []
         return Response.json({
            success: false,
            message: usernameError?.length > 0 ? usernameError.join(', ') : "invalid query parameters"
         }, {status: 400})
      }
         const { username } = result.data
         const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

         if(existingVerifiedUser) { 
            return Response.json({
               success: false,
               message: "Already exist username"
            }, {status: 400})
         }

         return Response.json({
            success: true,
            message: "Username is available"
         }, {status: 200})
         
   } catch (error) {
      console.log("error checking username : ",error);
      return Response.json({
         success: false,
         message: "Error checking username"
      }, {status: 500})
   }
}