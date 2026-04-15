import { z } from "zod"

export const contactFormSchema = z.object({
  first_name: z
    .string()
    .min(3, {
      message: "First name must be at least 3 characters.",
    })
    .max(15),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .max(25),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(1000),
})
