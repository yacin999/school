import { useAuthSignUp } from '@/hooks/authentication'
import React from 'react'

type Props = {}

const SignUpForm = (props: Props) => {

    const {
        register,
        errors,
        verifying,
        creating,
        onGenerateCode,
        onInitiateUserRegistration,
        code,
        setCode,
        getValues
    } = useAuthSignUp()
  return (
    <div>SignUpForm</div>
  )
}

export default SignUpForm