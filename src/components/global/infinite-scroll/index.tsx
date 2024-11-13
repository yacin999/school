"use client"

import React from 'react'

type Props = {
    action : "GROUPS" | "POSTS"
    children : React.ReactNode
    identifier : string
    paginate : number
    search? : boolean
    loading? : "POST"
}

const InfiniteScrollObserver = ({
    action,
    children,
    identifier,
    paginate,
    search,
    loading
}: Props) => {
    const {observerElement, isFetching } = useInfiniteScroll(
        action,
        identifier,
        paginate,
        search
    )
  return (
    <div>InfiniteScrollObserver</div>
  )
}

export default InfiniteScrollObserver