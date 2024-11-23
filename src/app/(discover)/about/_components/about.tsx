"use client"

import NoResult from '@/components/global/search/no-results'
import { useGroupAbout, useGroupInfo } from '@/hooks/groups'
import React from 'react'

type Props = {
    userid : string
    groupid : string
}

const AboutGroup = ({ userid, groupid }: Props) => {
    const { group } = useGroupInfo()
    const {
      setOnDescription,
      onDescription,
      setJsonDescription,
      onJsonDescription,
      errors,
      onEditDescription,
      editor,
      activeMedia,
      onSetActiveMedia,
      setOnHtmlDescription,
      onUpdateDescription,
      isPending,
     } = useGroupAbout(
      group.jsonDescription,
      group.htmlDescription,
      group.gallery[0],
      groupid
     )


    if (!group) {
      return (
        <div>
          <NoResult />
        </div>
      )
    }

    return <div className='flex flex-col gap-y-10'>
      <div>
        <h2 className='font-bold text-[56px] leading-none md:leading-normal'>
          {group.name}
        </h2>
        <p className='text-themeTextGray leading-none md:mt-2 mt-5'>
          {group.description}
        </p>
      </div>
    </div>
}

export default AboutGroup