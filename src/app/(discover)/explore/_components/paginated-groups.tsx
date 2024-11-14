import { useAppSelector } from '@/redux/store'
import React from 'react'
import GroupCard from './group-card'


const PaginatedGroups = () => {

    const { data } = useAppSelector(state => state.infiniteScrollReducer)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((data : any) => <GroupCard key={data.id} {...data}/>)
}

export default PaginatedGroups