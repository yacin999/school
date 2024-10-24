import { z } from "zod";




export const SignUpSchema = z.object({
    firstname : z.string().min(3,{
        message : "firstname must be atleast 3 characters"
    }),
    lastname : z.string().min(3,{
        message : "lastname must be atleast 3 characters"
    }),
    email : z.string().min(3,{
        message : "You must give a valid email"
    }),
    password : z.string()
    .min(8,{
        message : "Your password must be atleast 8 characters long"
    })
    .max(64, {
        message : "Your password can't be longer than 64 characters long"
    })
    .refine(
        (value) => /^[a-zA-z0-9_.-]*$/.test(value ?? ""),
        "password should contain only characters and numbers"
    )
})