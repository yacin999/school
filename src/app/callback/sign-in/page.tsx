import { onSignInUser } from '@/actions/auth'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'


const CompleteSignIn = async () => {
    const user = await currentUser()

    if (!user) return redirect("/sign-in")
    const authenticated = await onSignInUser(user.id)

    if (authenticated.status === 200) return redirect("/group/create")

    if (authenticated.status === 207 ) 
        return redirect(`/group/${authenticated.groupId}/channel/${authenticated.channelId}`)

    if (authenticated.status !== 200) {
        redirect("/sign-in")
    }
  return (
    <div>CompleteSignIn</div>
  )
}

export default CompleteSignIn