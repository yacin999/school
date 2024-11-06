import React from 'react'

type Props = {
    groupid : string
}

const GroupSettingsForm = ({ groupid }: Props) => {
    const {} = useGroupSettings(groupid)
  return (
    <div>GroupSettingsForm</div>
  )
}

export default GroupSettingsForm