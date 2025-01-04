import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'
import User from "@/models/userModel";

export const sendMail = async({email, emailType, userId}:any) => {
   try {
      
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      if(emailType === "Verify")
      {
         await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000
         })
      } else if(emailType === "Reset") {
         await User.findByIdAndUpdate(userId, {
            forgetPasswordToken: hashedToken,
            forgetPasswordTokenExpiry: Date.now() + 3600000
         })
      }

      // Looking to send emails in production? Check out our Email API/SMTP product!
      const transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
         user: "e2e9617383f9cf",
         pass: "2c5e4e3446dda6"
         }
      });

       const mailOptions = {
         from: 'hatim12@gmail.com',
         to: email,
         subject:( emailType === "Verify" ) ? "Verify your email" : "Reset your password",
         html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
         ${emailType === "Verify" ? "verify your email" : "reset your password"} or copy and paste below link in the browser<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
         </p>`
       };

       const mailResponse = await transport.sendMail(mailOptions)
       return mailResponse
   } catch (error:any) {
      throw new Error(error.message);
   }
}
