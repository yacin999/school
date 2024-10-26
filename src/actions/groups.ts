"use server"

import { client } from "@/lib/prisma"

export const onAffilateInfo = async (id : string) => {
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