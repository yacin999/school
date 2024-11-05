import React from 'react'
import Notification from './notification'
import { Message } from '@/icons'
import Link from 'next/link'
import UserAvatar from './user'

type Props = {
    image : string | undefined
    groupid : string
    userid : string
}

const UserWidget = ({ image, groupid, userid }: Props) => {
  return (
    <div className='hidden md:flex items-center gap-5'>
        <Notification/>
        <Link href={`/group/${groupid}/messages`}>
            <Message/>
        </Link>
        <UserAvatar userid={userid} image={image} groupid={groupid} />
    </div>
  )
}

export default UserWidget