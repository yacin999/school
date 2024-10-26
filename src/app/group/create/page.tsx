import { onAuthenticatedUser } from '@/actions/auth'
import React from 'react'


const GroupCreatePage = async({searchParams} : {
    searchParams : {[affiliate : string] : string}
}) => {

    const user = await onAuthenticatedUser()

    const affiliate = await getAfiliateInfo(searchParams.affiliate)
  return (
    <div>GroupCreatePage</div>
  )
}

export default GroupCreatePage
