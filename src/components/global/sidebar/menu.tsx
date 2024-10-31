"use client"

import React from 'react'
import { IChannels } from '.'
import { usePathname } from 'next/navigation'
import { useChannelInfo } from '@/hooks/channels'

type Props = {
    channels : IChannels[] | undefined
    optimisticChannel :
    | {
        id : string,
        name : string,
        icon : string,
        createdAt : Date,
        groupId : string | null
    } | undefined
    loading : boolean
    groupid : string
    groupUserId : string | undefined
    userId : string
}

const SideBarMenu = ({ channels, optimisticChannel, loading, groupid, groupUserId, userId}: Props) => {
    const pathname = usePathname()
    const currentPage = pathname.split("/").pop()

    const {} = useChannelInfo()
  return (
    <div>SideBarMenu</div>
  )
}

export default SideBarMenu