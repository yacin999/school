"use server"

import { CreateGroupSchema } from "@/components/forms/create-group/schema"
import { client } from "@/lib/prisma"
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';
import { onAuthenticatedUser } from "./auth";
import { revalidatePath } from "next/cache";



export const onGetAffiliateInfo = async (id : string) => {
    try {
        const affiliateInfo = await client.affiliate.findUnique({
            where : {
                id
            },
            select : {
                Group : {
                    select : {
                        User : {
                            select : {
                                firstname : true,
                                lastname : true,
                                image : true,
                                id : true,
                                stripeId : true
                            }
                        }
                    }
                }
            }
        })

        if (affiliateInfo) {
            return  {
                status : 200,
                user : affiliateInfo
            }
        }

        return {
            status : 400
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { status: 400 }
    }
}


export const onCreateNewGroup = async (
    userId : string,
    data : z.infer<typeof CreateGroupSchema>
) => {
    try {
        const created = await client.user.update({
            where : {
                id : userId
            },
            data : {
                group : {
                    create : {
                        ...data,
                        affiliate : {
                            create : {}
                        },
                        member : {
                            create : {
                                userId : userId
                            }
                        },
                        channel : {
                            create : [
                                {
                                    id : uuidv4(),
                                    name : "general",
                                    icon : "general"
                                },
                                {
                                    id : uuidv4(),
                                    name : "announcements",
                                    icon : "announcement"
                                }
                            ]
                        }
                    }
                }
            },
            select : {
                id : true,
                group : {
                    select : {
                        id : true,
                        channel : {
                            select : {
                                id : true
                            },
                            take : 1,
                            orderBy : {
                                createdAt : "asc"
                            }
                        }
                    }
                }
            }
        })


        if (created ) {
            return {
                status : 200,
                data : created,
                message : "Group created successfully"
            }
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            status : 400,
            message : "Oops! group creation failed, try again later"
        }
    }
}


export const onGetGroupInfo = async (groupId : string) => {
    try {
        const user = await onAuthenticatedUser()
        const group = await client.group.findUnique({
            where : {
                id : groupId
            }
        })


        if (group) {
            return {
                status : 200,
                group,
                groupOwner : user.id === group.userId ? true : false
            }
        }

        return {status : 404}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {status : 400}
    }
}

export const onGetUserGroups = async (userId : string) => {
    try {
        const groups = await client.user.findUnique({
            where : {
                id : userId
            },
            select : {
                group : {
                    select : {
                        id : true,
                        name : true,
                        icon : true,
                        channel : {
                            where : {
                                name : "general"
                            },
                            select : {
                                id : true
                            }
                        }
                    }
                },
                membership : {
                    select : {
                        Group : {
                            select : {
                                id : true,
                                icon : true,
                                name : true,
                                channel : {
                                    where : {
                                        name : "general"
                                    },
                                    select : {
                                        id : true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (groups && (groups.group.length > 0 || groups.membership.length > 0)) return {
            status :  200,
            groups : groups.group,
            members : groups.membership
        }

        return {status : 404}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {status : 400}
    }
}

export const onGetGroupChannels = async (groupId : string) => {
    try {
        const channels = await client.channel.findMany({
            where : {
                groupId : groupId
            },
            orderBy : {
                createdAt : "asc"
            }
        })

        if (channels) return {
            status : 200,
            channels
        }

        return {status : 404}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            status : 400,
            message : "Oops! something went wrong"
        }
    }
}


export const onGetGroupSubscriptions = async (groupId : string) => {
   try {
        const subscriptions = await client.subscription.findMany({
            where : {
                groupId : groupId
            },
            orderBy : {
                createdAt : "desc"
            }
        })

        const count = await client.members.count({
            where : {
                groupId : groupId
            },
        })

        if (subscriptions) return {
            status : 200,
            subscriptions,
            count
        }

        return {
            status : 404
        }
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   } catch (error) {
        return {
            status : 400
        }
   }
}


export const onGetAllGroupMembers = async (groupId : string) => {
    try {
        const user = await onAuthenticatedUser()
         const members = await client.members.findMany({
             where : {
                groupId : groupId,
                NOT : {
                    userId : user.id
                }
             },
             include : {
                User : true
             }
         })
 
        
         if (members && members.length > 0) return {
             status : 200,
             members
         }
 
         return {
             status : 404
         }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
         return {
             status : 400
         }
    }
}

export const onSearchGroups = async (
    mode : "GROUPS" | "POSTS",
    query : string,
    paginate? : number
) => {
    try {
        if (mode === "GROUPS") {
            const fetchedGroups = await client.group.findMany({
                where : {
                    name : {
                        contains : query,
                        mode : "insensitive"
                    }
                },
                take : 6,
                skip : paginate || 0
            })

            if (fetchedGroups) {
                if (fetchedGroups.length > 0) {
                    return {
                        status: 200,
                        groups: fetchedGroups,
                    }
                }
            }

            return {status : 404}
        }


        if (mode === "POSTS") {
            const fetchedPosts = await client.post.findMany({
                where : {
                    title : {
                        contains : query,
                        mode : "insensitive"
                    }
                },
                take : 6,
                skip : paginate || 0
            })


            if (fetchedPosts) {
                if (fetchedPosts.length > 0) {
                    return {
                        status: 200,
                        posts: fetchedPosts,
                    }
                }
            }

            return {status : 404}
        }
    } catch (error) {
        console.log("Error from onSearchGroup :", error)
        return {
            status : 400,
            message : "Oops! something went wrong"
        }
    }
}

export const onUpDateGroupSettings = async (
    groupid: string,
    type:
      | "IMAGE"
      | "ICON"
      | "NAME"
      | "DESCRIPTION"
      | "JSONDESCRIPTION"
      | "HTMLDESCRIPTION",
    content: string,
    path: string,
  ) => {
    try {
      if (type === "IMAGE") {
        await client.group.update({
          where: {
            id: groupid,
          },
          data: {
            thumbnail: content,
          },
        })
      }
      if (type === "ICON") {
        await client.group.update({
          where: {
            id: groupid,
          },
          data: {
            icon: content,
          },
        })
        console.log("uploaded image")
      }
      if (type === "DESCRIPTION") {
        await client.group.update({
          where: {
            id: groupid,
          },
          data: {
            description: content,
          },
        })
      }
      if (type === "NAME") {
        await client.group.update({
          where: {
            id: groupid,
          },
          data: {
            name: content,
          },
        })
      }
      if (type === "JSONDESCRIPTION") {
        await client.group.update({
          where: {
            id: groupid,
          },
          data: {
            jsonDescription: content,
          },
        })
      }
      if (type === "HTMLDESCRIPTION") {
        await client.group.update({
          where: {
            id: groupid,
          },
          data: {
            htmlDescription: content,
          },
        })
      }
      revalidatePath(path)
      return { status: 200 }
    } catch (error) {
      console.log(error)
      return { status: 400 }
    }
}


export const onGetExploreGroup = async (category : string, paginate : number) => {
    try {
        
        const groups = await client.group.findMany({
            where : {
                category,
                NOT : {
                    description : null,
                    thumbnail : null
                }
            },
            take : 6,
            skip : paginate
        })

        if (groups && groups.length > 0) {
            return {status : 200, groups}
        }

        return {
            status : 404,
            message : "No groups found in this category"
        }
    } catch (error) {   
        console.log("Error from onGetExploreGroup action : ", error)
        return {
            status : 400,
            message : "Oops! something went wrong"
        }
    }
}
  
export const onGetPaginatePosts = async (
    identifier : string,
    paginate? : number
) => {
    try {
        const user = await onAuthenticatedUser()
        const posts = await client.post.findMany({
            where : {
                channelId : identifier
            },
            skip : paginate,
            take : 2,
            orderBy : {
                createdAt : "desc"
            },
            include : {
                channel : {
                    select : {
                        name : true
                    }
                },
                author : {
                    select : {
                        firstname : true,
                        lastname : true,
                        image : true
                    }
                },
                _count : {
                    select : {
                        likes : true,
                        comments : true
                    }
                },
                likes : {
                    where : {
                        userId : user.id!
                    },
                    select : {
                        userId : true,
                        id : true
                    }
                }
            }
        })

        if (posts && posts.length > 0) return {status : 200, posts}
        return {status : 404}
    } catch (error) {
        console.log("Error from onGetPaginatePosts action", error)
        return {
            status: 400
        }
    }
}


export const onUpdateGroupGallery = async (
    groupid: string,
    content: string,
  ) => {
    try {
      const mediaLimit = await client.group.findUnique({
        where: {
          id: groupid,
        },
        select: {
          gallery: true,
        },
      })
  
      if (mediaLimit && mediaLimit?.gallery.length < 6) {
        await client.group.update({
          where: {
            id: groupid,
          },
          data: {
            gallery: {
              push: content,
            },
          },
        })
        revalidatePath(`/about/${groupid}`)
        return { status: 200 }
      }
  
      return {
        status: 400,
        message: "Looks like your gallery has the maximum media allowed",
      }
    } catch (error) {
        console.log("Error from onUpdateGroupGallery :", error)
      return { status: 400, message: "Looks like something went wrong" }
    }
  }
  

export const onJoinGroup = async (groupid: string) => {
try {
    const user = await onAuthenticatedUser()
    const member = await client.group.update({
    where: {
        id: groupid,
    },
    data: {
        member: {
        create: {
            userId: user.id,
        },
        },
    },
    })
    if (member) {
    return { status: 200 }
    }
} catch (error) {
    console.log("Error from onJoinGroup action :", error)
    return { status: 404 }
}
}
  

export const onGetAffiliateLink = async (groupid: string) => {
    try {
      const affiliate = await client.affiliate.findUnique({
        where: {
          groupId: groupid,
        },
        select: {
          id: true,
        },
      })
  
      return { status: 200, affiliate }
    } catch (error) {
        console.log("Error from onGetAffiliateLink", error)
      return { status: 400, message: "Oops! soomething went wrong" }
    }
  }