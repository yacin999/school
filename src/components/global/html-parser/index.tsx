import React, { useEffect, useState } from 'react'

type Props = {
    html : string
}

const HtmlParser = ({html}: Props) => {

    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(()=>{
        setMounted(true)
        return () => setMounted(true)
    }, [])
  return (
    <div className='[&_h1]:text-4xl [&_h2]:text-3xl [&_blockquote]:italic [&_iframe]:aspect-video [&_h3]:text-2xl text-themeTextGray flex flex-col gap-y-3'>
      {mounted && parse()}
    </div>
  )
}

export default HtmlParser