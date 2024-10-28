import { Slider } from '@/components/ui/slider'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Swiper, SwiperProps } from 'swiper/react';

type Props = {
    overlay? : string
    label? : string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register? : UseFormRegister<any>
    selected? : string
    route? : boolean
} & SwiperProps

const GroupListSlider = ({overlay, label, register, selected, route, ...rest} : Props) => {
  return (
    <Slider 
        slidesPerView={"auto"}
        spaceBetween={10}
        loop
        freeMode
        label={label}
        overlay={overlay}
        {...rest}
    ></Slider>
  )
}

export default GroupListSlider