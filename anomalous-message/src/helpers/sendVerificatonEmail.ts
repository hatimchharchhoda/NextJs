import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerification(
   email: string,
   username: string,
   verifyCode: string
): Promise<ApiResponse> {
   try {
      await resend.emails.send({
         from: 'onboarding@resend.dev',
         to: email,
         subject: 'Anomalous Message | Verification Code',
         react: VerificationEmail({username, otp: verifyCode}),
       });
      return { success: true, message: "Success send verification email" };
      
   } catch (emailError) {
      console.log("email sending verification failed",emailError);
      return { success: false, message: "Failed to send verification email" };
   }
}