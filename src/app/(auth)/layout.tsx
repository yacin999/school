import { onAuthenticatedUser } from '@/actions/auth'
import React from 'react'

type Props = {
    children : React.ReactNode
}

const AuthLayout = async ({children}: Props) => {
    const user = await onAuthenticatedUser()
  return (
    <div>AuthLayout</div>
  )
}

export default AuthLayout