"use client"

import { supabaseClient } from '@/lib/utils'
import { AppDispatch } from '@/redux/store'
import { useClerk } from '@clerk/nextjs'
import React from 'react'
import { useDispatch } from 'react-redux'
import { onOffline } from "@/redux/slices/online-member-slice"
import { DropDown } from '../drop-down'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Logout, Settings } from '@/icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


type Props = {
    userid : string
    image : string | undefined
    groupid : string
}

const UserAvatar = ({ userid, image, groupid }: Props) => {
    const { signOut } = useClerk()

    const untrackPresence = async () => {
        await supabaseClient.channel("tracking").untrack()
    }
    const dispatch : AppDispatch = useDispatch()

    console.log(userid)

    const onLogout = async () => {
        untrackPresence()
        dispatch(onOffline({members : [{id : userid!}]}))
        signOut({redirectUrl : "/"})
    }
  return (
    <DropDown
        title='Account'
        trigger={
            <Avatar className='cursor-pointer'>
                <AvatarImage src={image} alt="user"/>
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
        }
    >
        <Link href={`/group/${groupid}/settings`} className="flex gap-x-2 px-2 mb-2">
            <Settings/>
            Settings 
        </Link>
        <Button
            onClick={onLogout}
            variant="ghost"
            className='flex gap-x-3 px-2 justify-start w-full'
        >
            <Logout />
            Logout
        </Button>
    </DropDown>
  )
}

export default UserAvatar