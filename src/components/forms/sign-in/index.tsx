"use client"

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { z } from "zod";

type Props = {}

const SignInForm = (props: Props) => {
    const {isPending, onAuthenticatedUser, register, errors } = useAuthSignIn()



    const form = useForm<typeof schemaForm>({
      defaultValues : {
        email : "",
        password : ""
      }
    })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data)=>data)}>

      </form>
    </Form>
  )
}

export default SignInForm