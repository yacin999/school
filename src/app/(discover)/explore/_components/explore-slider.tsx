import { useGroupList } from '@/hooks/groups'
import React from 'react'

type Props = {
    label : string
    text : string
    query : string
}

const ExploreSlider = ({ label, text, query }: Props) => {
    const {groups, status } = useGroupList(query)
    const {
        refetch,
        isFetching,
        data : fetchedData,
        onLoadSlider
    } = useExploreSlider(query, groups && groups.length)
  return (
    <div>ExploreSlider</div>
  )
}

export default ExploreSlider