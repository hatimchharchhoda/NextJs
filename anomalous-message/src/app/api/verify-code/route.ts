import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
   await dbConnect()

   try {
      const {username, code} = await request.json()
      const decodedUser = decodeURIComponent(username)
      const user = await UserModel.findOne({username: decodedUser})

      if(!user) {
         return Response.json({
            success: false,
            message: "User not found"
         }, {status: 500})
      }

      const isCodeValid = user.verifiedCode === code
      const isCodeExpiryValid = new Date(user.verifiedCodeExpiry) > new Date()

      if(isCodeExpiryValid && isCodeValid) {
         user.isVerified = true
         await user.save()
         return Response.json({
            success: true,
            message: "Account verified successfully"
         }, {status: 200})
      } else if(!isCodeExpiryValid) {
         return Response.json({
            success: false,
            message: "Your verification code has been expired, please Signin again"
         }, {status: 400})
      } else {
         return Response.json({
            success: false,
            message: "Please check your verification code"
         }, {status: 400})
      }
   } catch (error) {
      console.log("Error in verifying code : ",error);
      return Response.json({
         success: false,
         message: "Error in verifying code"
      }, {status: 500})
   }
}