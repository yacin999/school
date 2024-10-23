"use client"

import { Form } from "@/components/ui/form";
import { useAuthSignIn } from "@/hooks/authentication";
import { useForm } from "react-hook-form"

type Props = {}

const SignInForm = (props: Props) => {
    const {isPending, onAuthenticatedUser, register, errors } = useAuthSignIn()


  return (
    <Form>
      <form onSubmit={()=> onAuthenticatedUser()}>

      </form>
    </Form>
  )
}

export default SignInForm