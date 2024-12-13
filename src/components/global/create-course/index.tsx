import { useCreateCourse } from '@/hooks/courses'
import React from 'react'

type Props = {
    groupid : string
}

const CourseCreate = ({ groupid }: Props) => {

    const {

    } = useCreateCourse(groupid)
  return (
    <div>CourseCreate</div>
  )
}

export default CourseCreate