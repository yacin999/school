/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client"

import GroupCard from '@/app/(discover)/explore/_components/group-card'
import { useGroupSettings } from '@/hooks/groups'
import React from 'react'

type Props = {
    groupid : string
}

const GroupSettingsForm = ({ groupid }: Props) => {
    const {
      data,
      register,
      errors,
      onUpdate,
      isPending,
      previewIcon,
      previewThumbnail,
      onJsonDescription,
      setJsonDescription,
      setOnDescription,
      onDescription
    } = useGroupSettings(groupid)
  return (
    <form
      className='flex flex-col h-full w-full items-start gap-y-5'
      onSubmit={onUpdate}
    >
      <div className='flex 2xl:flex-row flex-col gap-10'>
        <div className='flex flex-col flex-start gap-3'>
          <p>Group Preview</p>
          <GroupCard
            id={data?.group?.id!}
            createdAt={data?.group?.createdAt!}
            userId={data?.group?.userId!}
            category={data?.group?.category!}
            description={data?.group?.description!}
            privacy={data?.group?.privacy!}
            thumbnail={data?.group?.thumbnail!}
            name={data?.group?.name!}
            preview={previewThumbnail!}
          />
        </div>
      </div>
    </form>
  )
}

export default GroupSettingsForm