import StripeElements from '@/components/global/stripe/elements'
import React from 'react'

type Props = {
    userId : string
    affiliate : boolean,
    stripeId? : string
}

const CreateGroup = ({userId, affiliate, stripeId}: Props) => {

    return (
        <StripeElements>
            <PaymentForm
                userId={userId}
                affiliate={affiliate}
                stripeId={stripeId}
            />
        </StripeElements>
    )
  return (
    <div>CreateGroup</div>
  )
}

export default CreateGroup