import { z } from "zod";

export const userValidator = z.object({
  phoneNumber: z.string().length(10, { message: "Phone number must be 10 digits" }),
})