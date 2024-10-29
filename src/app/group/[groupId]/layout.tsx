import { onAuthenticatedUser } from '@/actions/auth'
import { onGetAllGroupMembers, onGetGroupChannels, onGetGroupInfo, onGetGroupSubscriptions, onGetUserGroups } from '@/actions/groups'
import { QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children : React.ReactNode
    params : {
        groupId : string
    }
}

const GroupLayout = async ({children, params}: Props) => {

    const query = new QueryClient()

    const user = await onAuthenticatedUser()

    if (!user.id) redirect("/sign-in")

    // group info
    await query.prefetchQuery({
        queryKey : ["group-info"],
        queryFn : () => onGetGroupInfo(params.groupId)
    })
    // user groups
    await query.prefetchQuery({
        queryKey : ["user-groups"],
        queryFn : () => onGetUserGroups(user.id as string)
    }) 
    // channels
    await query.prefetchQuery({
        queryKey : ["group-channels"],
        queryFn : () => onGetGroupChannels(params.groupId)
    }) 
    // group subscriptions
    await query.prefetchQuery({
        queryKey : ["group-subscriptions"],
        queryFn : ()=> onGetGroupSubscriptions(params.groupId)
    })
    // member-chats
    await query.prefetchQuery({
        queryKey : ["member-chats"],
        queryFn : ()=> onGetAllGroupMembers(params.groupId)
    })
  return (
    <div>GroupLayout</div>
  )
}

export default GroupLayout