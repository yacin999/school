"use client"

import { useSearch } from '@/hooks/groups'
import React from 'react'

type Props = {
  className : string
  inputStype? : string
  placeholder : string
  searchType : "GROUPS" | "POSTS"
  iconStyle? : string
  glass? : boolean
}

const Search = ({className, inputStype, placeholder, searchType, iconStyle, glass}: Props) => {
  const { query, onSearchQuery } = useSearch(searchType)
  return (
    <div>Search</div>
  )
}

export default Search