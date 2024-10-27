import { loadStripe } from "@stripe/stripe-js";



export const useStripeElements = () => {
    const stripePromise = async () => await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string)

    return {stripePromise}
}