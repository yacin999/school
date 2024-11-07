"use client"

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
        </div>
      </div>
    </form>
  )
}

export default GroupSettingsForm