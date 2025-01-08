import { z } from "zod"

export const messageSchema = z.object({
   content: z
      .string()
      .min(10, { message: "Message is required more than 10 characters" })
      .max(200, { message: "Message is too long" })
})