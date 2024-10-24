import React from 'react'

type Props = {
    otp : string,
    setOtp : React.Dispatch<React.SetStateAction<string>>
}

const OtpInput = ({otp, setOtp}: Props) => {
  return (
    <div>OtpInput</div>
  )
}

export default OtpInput