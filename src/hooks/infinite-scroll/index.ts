import { AppDispatch, useAppSelector } from "@/redux/store"
import { useRef } from "react"
import { useDispatch } from "react-redux"

export const useInfiniteScroll = (
    action : "GROUPS" | "CHANELL" | "POSTS",
    identifier : string,
    paginate : number,
    search? : boolean,
    query? : string
) => {
    const observerElement = useRef<HTMLDivElement>(null)
    const dispatch:AppDispatch = useDispatch()
    const {} = useAppSelector(state=> state.infiniteScrollReducer)

}