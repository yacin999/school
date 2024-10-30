"use client"

import { useGroupChatOnline } from '@/hooks/groups'
import { useSidebar } from '@/hooks/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { DropDown } from '../drop-down'
import { CarotSort } from '@/icons'

type Props = {
    groupid : string,
    userid : string,
    mobile? : boolean
}

export interface IGroupInfo {
    status: number
    group:
      | {
          id: string
          name: string
          category: string
          thumbnail: string | null
          description: string | null
          gallery: string[]
          jsonDescription: string | null
          htmlDescription: string | null
          privacy: boolean
          active: boolean
          createdAt: Date
          userId: string
          icon: string
        }
      | undefined
}

export interface IChannels {
id: string
name: string
icon: string
createdAt: Date
groupId: string | null
}

export interface IGroups {
status: number
groups:
    | {
        icon: string | null
        id: string
        name: string
    }[]
    | undefined
}

const Sidebar = ({groupid, userid, mobile}: Props) => {
    const {groupInfo, groups, mutate, variables, isPending, channels} = useSidebar(groupid)

    useGroupChatOnline(userid)
  return (
    <div className={cn('h-screen flex-col gap-y-10 sm:px-5', 
      !mobile ? "hidden bg-black md:w-[300px] fixed md:flex" : "w-full flex")
    }>
      {groups.groups && groups.groups.length > 0 && (
        <DropDown
          title={'Groups'}
          trigger={
            <div className='w-full flex items-center justify-between text-themeTextGray md:border-[1px] borderthem p-3 rounded-xl'>
              <Image
                src={`https://ucnrecdn.com/${groupInfo.group?.icon as string}/`}
                alt='icon'
                className='w-10 rounded-lg'
              />
              <p className='text-sm'>{groupInfo.group?.name}</p>
              <span className=''>
                <CarotSort/>
              </span>
            </div>
          }
          >
            {}
          </DropDown>
      )}
    </div>
  )
}

export default Sidebar