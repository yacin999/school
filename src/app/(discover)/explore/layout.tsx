import React from 'react'
import { Navbar } from './_components/navbar'

type ExploreLayoutProps = {
    children : React.ReactNode
}

const layout = ({children}: ExploreLayoutProps) => {


  return (
    <div className='flex flex-col min-h-screen bg-black pb-10'>
        <Navbar/>
        {children}
    </div>
  )
}

export default layout