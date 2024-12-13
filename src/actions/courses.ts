"use server"

import { client } from "@/lib/prisma"


export const onGetGroupCourses = async (groupid: string) => {
    try {
      const courses = await client.course.findMany({
        where: {
          groupId: groupid,
        },
        take: 8,
        orderBy: {
          createdAt: "desc",
        },
      })
  
      if (courses && courses.length > 0) {
        return { status: 200, courses }
      }
  
      return {
        status: 404,
        message: "No courses found",
      }
    } catch (error) {
        console.log("Error from onGetGroupCourses :", error)
      return {
        status: 400,
        message: "Oops! something went wrong",
      }
    }
  }