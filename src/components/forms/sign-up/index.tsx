import { FormGenerator } from '@/components/global/form-generator'
import { GROUPLE_CONSTANTS } from '@/constants'
import { useAuthSignUp } from '@/hooks/authentication'
import dynamic from 'next/dynamic'
import React from 'react'

type Props = {}

const OtpInput = dynamic(() => import("@/components/global/otp-input").then(
    (component)=> component.default),
    {ssr : false}
)

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
    <form
        onSubmit={onInitiateUserRegistration}
        className='flex flex-col gap-3 mt-10'
    >
        {verifying ? (
            <div className='flex justify-center mb-5'>
                <OtpInput otp={code} setOtp={setCode} />
            </div>
        ): (
            GROUPLE_CONSTANTS.signUpForm.map((field)=> (
                <FormGenerator
                {...field}
                key={field.id}
                register={register}
                errors={errors}
            />
            ))
        )}
    </form>
  )
}

export default SignUpForm