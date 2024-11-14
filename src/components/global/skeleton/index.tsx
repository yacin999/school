import React from 'react'
import { Skeleton as SkeletonUI } from '@/components/ui/skeleton'

type Props = {
    element : "CARD" | "POST"
}

const Skeleton = ({ element }: Props) => {
    switch (element) {
        case "CARD":
            return (
                <div className='flex flex-col gap-y-3 h-full bg-[#181818] rounded-xl overflow-hidden'>
                    <SkeletonUI className='h-[200px] w-full bg-[#202020]'/>
                    <SkeletonUI className='h-[40px] w-7/12 rounded-md ml-5 bg-[#202020]'/>
                    <SkeletonUI className='h-[30px] w-4/12 rounded-md ml-5 bg-[#202020]'/>
                </div>
            )
        case "POST":
            return (
                <div className='w-full pt-4 bg-[#1C1C1E] text-white rounded-lg border border-[#27272E] overflow-hidden'>
                    <div className='flex items-center mb-3 px-4'>
                        <SkeletonUI className='w-12 h-12 mr-4 rounded-full bg-[#202020]'/>
                        <div>
                            <SkeletonUI className='w-24 h-5 rounded-md bg-[#202020] mr-1'/>
                            <SkeletonUI className='w-40 h-4 mr-4 rounded-md bg-[#202020]'/>
                        </div>
                    </div>

                    <SkeletonUI className='h-[280px] w-full bg-[#202020]'/>  
                    <div className='flex items-center gap-3 border-t border-[#27272A] px-6 py-2'>
                        <SkeletonUI className='w-20 h-4 mr-4 rounded-md bg-[#202020]'/>
                        <SkeletonUI className='w-20 h-4 mr-4 rounded-md bg-[#202020]'/>
                        <SkeletonUI className='w-20 h-4 mr-4 rounded-md bg-[#202020]'/>
                    </div>
                </div>
            )
        
        default:
            return <></>
    }
  
    return (
    <div>Skeleton</div>
  )
}

export default Skeleton