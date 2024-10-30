/* eslint-disable @next/next/no-img-element */
"use client"

import { useGroupChatOnline } from '@/hooks/groups'
import { useSidebar } from '@/hooks/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { DropDown } from '../drop-down'
import { CarotSort } from '@/icons'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Group } from 'lucide-react'

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
    console.log("test channels", channels)
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
              <img
                src={`https://ucarecdn.com/${groupInfo.group?.icon as string}/`}
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
            {groups && groups.groups.length > 0 && (groups.groups.map((item)=> (
              item.id !== groupid && (
                <Link
                  key={item.id}
                  href={`/group/${item.id}/channel/${channels?.channels?.[0].id}`}
                >
                  <Button
                    variant={"ghost"}
                    className='flex gap-2 w-full justify-center items-center hover:bg-themeGray'
                    >
                      <Group/>
                      {item.name}
                    </Button>
                </Link>
              )
            )))}
          </DropDown>
      )}
    </div>
  )
}

export default Sidebar