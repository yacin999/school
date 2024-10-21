import React from 'react'
import Menu from './menu'



const LandingPageNavbar = () => {
  return (
    <div className='w-full flex justify-between sticky top-0 items-center py-5 z-50'>
      <p className='font-bold text-2xl'>School.</p>
      <Menu
        orientation={"desktop"}
      />
    </div>
  )
}

export default LandingPageNavbar