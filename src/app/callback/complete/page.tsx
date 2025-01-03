import { onSignUpUser } from '@/actions/auth'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


const CompleteOAuthAfterCallback = async () => {
    const user = await currentUser()
    console.log("from CompleteOAuthAfterCallback (user)", user)
    if (!user) redirect("sign-in")

    const complete = await onSignUpUser({
        firstname : user.firstName as string,
        lastname : user.lastName as string,
        image : user.imageUrl,
        clerkId : user.id
    })
    console.log("from callback complete SIGNUP route :", complete)
    if (complete.status ===  200) {
        redirect("/group/create")
    }

    if (complete.status !== 200) {
        redirect("sign-in")
    }
}

export default CompleteOAuthAfterCallback