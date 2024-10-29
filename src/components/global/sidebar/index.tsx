import React from 'react'

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
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar