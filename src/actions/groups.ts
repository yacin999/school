"use server"

import { CreateGroupSchema } from "@/components/forms/create-group/schema"
import { client } from "@/lib/prisma"
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';
import { onAuthenticatedUser } from "./auth";



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