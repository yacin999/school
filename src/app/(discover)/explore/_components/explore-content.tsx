"use client"

import { useAppSelector } from '@/redux/store'
import dynamic from 'next/dynamic'
import React from 'react'

type Props = {
    layout : "SLIDER" | "LIST"
    category? : string
}


const SearchGroups = dynamic(()=> import("./search-groups").then(components=> components.SearchGroups))

const ExplorePageContent = ({layout, category}: Props) => {
    const { isSearching, data, status, debounce } = useAppSelector((state)=> state.searchReducer)
    return (
        <div className='flex flex-col'>
            {isSearching || debounce ? 
            <>
                <SearchGroups
                    searching={isSearching as boolean}
                    data={data!}
                    query={debounce}
                />
            </> : <></>}
        </div>
    )
}

export default ExplorePageContent