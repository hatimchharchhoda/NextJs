import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request) {
   await dbConnect()

   try {
      const { username, content } = await request.json()
      const user = await UserModel.findOne({ username: username })

      if(!user) {
         return Response.json({
            success: false,
            messages: "Username is not available"
         }, {status: 403})
      }

      const newMessage = {content, createdAt: new Date()}
      user.message.push(newMessage as Message)
      await user.save()

      return Response.json({
         success: true,
         messages: "Message sent successfully"
      }, {status: 200})

   } catch (error) {
      console.log("Error adding message : ",error);
      return Response.json({
            success: false,
            messages: "Error adding message"
         }, {status: 500})
   }
}