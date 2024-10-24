import { useSignIn, useSignUp } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"
import  { zodResolver }  from "@hookform/resolvers/zod"
import { SignInSchema } from "../../components/forms/sign-in/schema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { SignUpSchema } from "@/components/forms/sign-up/schama"


export const useAuthSignIn = () => {
    const { isLoaded, setActive, signIn } = useSignIn()
    const {
      register,
      formState: { errors },
      reset,
      handleSubmit,
    } = useForm<z.infer<typeof SignInSchema>>({
      resolver: zodResolver(SignInSchema),
      mode: "onBlur",
    })
  
    const router = useRouter()
    const onClerkAuth = async (email: string, password: string) => {
      if (!isLoaded)
        return toast("Error", {
          description: "Oops! something went wrong",
        })
      try {
        const authenticated = await signIn.create({
          identifier: email,
          password: password,
        })
  
        if (authenticated.status === "complete") {
          reset()
          await setActive({ session: authenticated.createdSessionId })
          toast("Success", {
            description: "Welcome back!",
          })
          router.push("/callback/sign-in")
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.errors[0].code === "form_password_incorrect")
          toast("Error", {
            description: "email/password is incorrect try again",
          })
      }
    }
  
    const { mutate: InitiateLoginFlow, isPending } = useMutation({
      mutationFn: ({ email, password }: { email: string; password: string }) =>
        onClerkAuth(email, password),
    })
  
    const onAuthenticateUser = handleSubmit(async (values) => {
      InitiateLoginFlow({ email: values.email, password: values.password })
    })
  
    return {
      onAuthenticateUser : onAuthenticateUser,
      isPending : isPending,
      register,
      errors,
    }
}


export const useAuthSignUp = () => {
  const {setActive, isLoaded, signUp} = useSignUp()
  const [craeting, setCraeting] = useState<boolean>(false)
  const [verifying, setVerifying] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")

  const {
    register,
    formState : {errors},
    reset,
    handleSubmit,
    getValues
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver : zodResolver(SignUpSchema),
    mode : "onBlur"
  })

  const router = useRouter()

  return {}
}
  