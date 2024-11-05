"use client"

import { Input } from '@/components/ui/input'
import { useSearch } from '@/hooks/groups'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
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
    <div className={cn(
      "flex items-center gap-2 border-2",
      className,
      glass && "bg-clip-padding backdrop-blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-20"
    )}
    >
      <SearchIcon className={cn(iconStyle || "text-themeTextGray")}/>
      <Input
        onChange={onSearchQuery}
        value={query}
        className={cn("bg-transparent border-0", inputStype)}
        placeholder={placeholder}
        type='text'
      />
    </div>
  )
}

export default Search