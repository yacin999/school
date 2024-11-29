"use server"
import { client } from '@/lib/prisma';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    typescript : true,
})

export const onGetSripeClientSecret = async () => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          currency : "usd",
          amount : 9900,
          automatic_payment_methods : {
            enabled : true
          }  
        })

        if (paymentIntent) {
            return {
                secret : paymentIntent.client_secret
            }
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            status : 400,
            message : "Failed to load form"
        }
    }
}


export const onTransferCommission = async (destination : string) => {
    try {
        const transfer = await stripe.transfers.create({
            amount : 3960,
            currency : "usd",
            destination : destination
        })

        if (transfer) {
            return {status : 200}
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {status : 400}
    }
}


export const onGetActiveSubscription = async (groupid : string) => {
    try {
        const subscription = await client.subscription.findFirst({
            where : {
                groupId : groupid,
                active : true
            }
        })

        if (subscription) {
            return {status : 200, subscription}
        }

    } catch (error) {
        console.log("error from onGetActiveSubscription :", error)
        return { status : 404 }
    }
}


export const onGetGroupSubscriptionPaymentIntent = async (groupid: string) => {
    console.log("running")
    try {
      const price = await client.subscription.findFirst({
        where: {
          groupId: groupid,
          active: true,
        },
        select: {
          price: true,
          Group: {
            select: {
              User: {
                select: {
                  stripeId: true,
                },
              },
            },
          },
        },
      })
  
      if (price && price.price) {
        console.log("🟣", price.Group?.User.stripeId)
        const paymentIntent = await stripe.paymentIntents.create({
          currency: "usd",
          amount: price.price * 100,
          automatic_payment_methods: {
            enabled: true,
          },
        })
  
        if (paymentIntent) {
          return { secret: paymentIntent.client_secret }
        }
      }
    } catch (error) {
        console.log("Error from onGetGroupSubscriptionPaymentIntent ", error)
      return { status: 400, message: "Failed to load form" }
    }
  }