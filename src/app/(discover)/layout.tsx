import React from 'react'
import { Navbar } from './explore/_components/navbar'

type LayoutProps = {
    children : React.ReactNode
}

const Layout = ({children}: LayoutProps) => {


  return (
    <div className='flex flex-col min-h-screen bg-black pb-10'>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout