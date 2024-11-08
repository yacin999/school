import React, { useEffect, useState } from 'react'

type Props = {
    html : string
}

const HtmlParser = ({html}: Props) => {

    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(()=>{
        setMounted
    }, [])
  return (
    <div>HtmlParser</div>
  )
}

export default HtmlParser