'use server'

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"



export const onAuthenticatedUser = async () => {
    try {
        const clerk = await currentUser()

        if (!clerk) return {status : 404}

        const user = await client.user.findUnique({
            where : {
                clerkId : clerk.id
            },
            select : {
                id: true,
                firstname : true,
                lastname : true
            }
        })

        if (user) {
            return {
                status : 200,
                id : user.id,
                image : clerk.imageUrl,
                username : `${user.firstname} ${user.lastname}`
            }
        }

        return {
            status : 404
        }
    } catch (error) {
        console.log("error from onAuthenticatedUser", error)
        return {
            status : 404
        }
    }
}


export const onSignUpUser = async (data : {
    firstname : string,
    lastname : string,
    clerkId : string,
    image : string
}) => {
    try {
        const createdUser = await client.user.create({
            data : {...data}
        })

        if (createdUser) {
            return {
                status: 200,
                message : "User successfully created",
                id : createdUser.id
            }
        }

        return {
            status : 400,
            message : "User could not be created! please try again"
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            status : 400,
            message : "Oops! something went wrong, please try again"
        }
    }
}