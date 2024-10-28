"use client"

import { Label } from '@/components/ui/label'
import React from 'react'
import { Swiper, SwiperProps } from 'swiper/react'
import { Navigation, Pagination, Autoplay, FreeMode} from "swiper/modules"

type SliderProps = {
    children : React.ReactNode,
    overlay? : boolean,
    label? : string
} & SwiperProps

const Slider = ({ children, overlay, label, ...rest}: SliderProps) => {
  return (
    <div className='w-full max-w-full overflow-x-hidden mt-5 relative'>
        {overlay && (
            <>
                <div className='abosolute w-[40px] slider-overlay left-0 h-full z-50'/>
                <div className='abosolute w-[40px] slider-overlay-rev right-0 h-full z-50'/>
            </>
        )}
        {label && (
            <Label className='pl-7 mb-3 text-themeTextGray'>{label}</Label>
        )}
        <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            {...rest}
        >
            {children}
        </Swiper>
    </div>
  )
}

export default Slider