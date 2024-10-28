"use server"
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
