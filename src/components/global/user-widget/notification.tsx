import React from 'react'
import GlassSheet from '../glass-sheet'
import { Bell } from '@/icons'



const Notification = () => {
  return (
    <GlassSheet
        trigger={
            <span className='cursor-pointer'>
                <Bell/>
            </span>
        }
    >
        <div>yo</div>
    </GlassSheet>
  )
}

export default Notification