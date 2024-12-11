"use server"

import { client } from "@/lib/prisma"
import { onAuthenticatedUser } from "./auth"



export const onGetChannelInfo = async (channelid: string) => {
    try {
      const user = await onAuthenticatedUser()
      const channel = await client.channel.findUnique({
        where: {
          id: channelid,
        },
        include: {
          posts: {
            take: 3,
            orderBy: {
              createdAt: "desc",
            },
            include: {
              channel: {
                select: {
                  name: true,
                },
              },
              author: {
                select: {
                  firstname: true,
                  lastname: true,
                  image: true,
                },
              },
              _count: {
                select: {
                  likes: true,
                  comments: true,
                },
              },
              likes: {
                where: {
                  userId: user.id!,
                },
                select: {
                  userId: true,
                  id: true,
                },
              },
            },
          },
        },
      })
      return channel
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { status: 400, message: "Oops! something went wrong" }
    }
}


export const onCreateNewChannel = async (
    groupId : string, 
    data : {
        id : string,
        name : string,
        icon : string
    }) => {
    try {
        const channel = await client.group.update({
            where : {
                id : groupId
            },
            data : {
                channel : {
                    create : {
                        ...data
                    }
                }
            },
            select : {
                channel : true
            }
        })

        if (channel) {
            return {
                status : 200,
                channel : channel.channel
            }
        }

        return {
            status : 400,
            message : "channel could not be created"
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            status : 400,
            message : "Oops! something went wrong"
        }
    }
}

export const onUpdateChannelInfo = async (
  channelid: string,
  name?: string,
  icon?: string,
) => {
  try {
    if (name) {
      const channel = await client.channel.update({
        where: {
          id: channelid,
        },
        data: {
          name,
        },
      })

      if (channel) {
        return {
          status: 200,
          message: "Channel name successfully updated",
        }
      }
      return {
        status: 404,
        message: "Channel not found! try again later",
      }
    }
    if (icon) {
      const channel = await client.channel.update({
        where: {
          id: channelid,
        },
        data: {
          icon,
        },
      })
      if (channel) {
        return {
          status: 200,
          message: "Channel icon successfully updated",
        }
      }
      return {
        status: 404,
        message: "Channel not found! try again later",
      }
    } else {
      const channel = await client.channel.update({
        where: {
          id: channelid,
        },
        data: {
          icon,
          name,
        },
      })
      if (channel) {
        return {
          status: 200,
          message: "Channel successfully updated",
        }
      }
      return {
        status: 404,
        message: "Channel not found! try again later",
      }
    }
  } catch (error) {
    console.log(error)
    return { status: 400, message: "Oops! something went wrong" }
  }
}


export const onDeleteChannel = async (channelId : string) => {
  try {
    const channel = await client.channel.delete({
      where : {
        id : channelId
      }
    })

    if (channel ) {
      return {
        status : 200,
        message : "Channel was deleted successfully"
      }
    }

    return {
      status : 204,
      message : "Channel not found! try again later"
    }
  } catch (error) {
    console.log(error)
    return { status: 400, message: "Oops! something went wrong" }
  }
}

export const onCreateChannelPost = async (
  channelid: string,
  title: string,
  content: string,
  htmlContent: string,
  jsonContent: string,
  postid: string,
) => {
  try {
    const user = await onAuthenticatedUser()
    const post = await client.post.create({
      data: {
        id: postid,
        authorId: user.id!,
        channelId: channelid,
        title,
        content,
        htmlContent,
        jsonContent,
      },
    })

    if (post) {
      return { status: 200, message: "Post successfully created" }
    }

    return { status: 404, message: "Channel not found" }
  } catch (error) {
    console.log("Error from onCreateChannelPost action :", error)
    return { status: 400, message: "Oops! something went wrong" }
  }
}

