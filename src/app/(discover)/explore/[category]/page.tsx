import { onGetExploreGroup } from '@/actions/groups'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import ExplorePageContent from '../_components/explore-content'

type Props = {
    params : { category : string }
}

const ExploreCategoryPage = async ({ params }: Props) => {

    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey : ["groups"],
        queryFn : () => onGetExploreGroup(params.category, 0)
    })
  return (
    <HydrationBoundary state={dehydrate(query)}>
        <ExplorePageContent layout='LIST' category={params.category} />
    </HydrationBoundary>
  )
}

export default ExploreCategoryPage