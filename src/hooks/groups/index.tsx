import { AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGroupChatOnline = (userid : string) => {
    const dispatch : AppDispatch = useDispatch()

    useEffect(()=>{ 
        const channel = supabaseClient.channel("tracking")

        channel
        .on("presence")
    }, [])
}