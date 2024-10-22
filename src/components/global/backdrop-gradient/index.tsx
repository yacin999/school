import { cn } from "@/lib/utils"
import React from "react"

type props = {
    children : React.ReactNode
    className ? : string
    container ? : string
}


const BackdropGradient = ({children, className, container} : props) => {
  return (
    <div className={cn("relative w-full flex flex-col", container)}>
        <div className={cn("absolute rounded-[50%] radial--blur mx-10", className)}>
        {children}
        </div>
    </div>
  )
}

export default BackdropGradient