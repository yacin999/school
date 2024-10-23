import { z } from "zod";



export const SignInSchema = z.object({
    email : z.string().email("You must give a valid email"),
    password : z
    .string()
    .min(8, {message : "Your password must be at least 8 characters long"})
    .refine((value)=> /^[a-zA-z0-9_.-]*$/.test(value ?? ""), "password should contain only alphabets and numbers")
})