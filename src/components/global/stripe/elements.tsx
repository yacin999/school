"use client"

import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { useStripeElements } from '@/hooks/payment'

type StripeElementsProps = {
    children : React.ReactNode
}

const StripeElements = ({children}: StripeElementsProps) => {
    const { stripePromise } = useStripeElements()

    const promise = stripePromise()
    
    return promise && <Elements stripe={promise}>{children}</Elements>
}

export default StripeElements