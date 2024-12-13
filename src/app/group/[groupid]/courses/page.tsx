import { QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params : {
        groupid : string
    }
}

const CoursesPage = async ({params}: Props) => {
    const client = new QueryClient()

    await client.prefetchQuery({
        queryKey : ["group-courses"],
        queryFn : () => onGetGroupCourses(params.groupid)
    })


  return (
    <div>CoursesPage</div>
  )
}

export default CoursesPage