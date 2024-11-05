/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseClient } from "@/lib/utils"
import { onOnline } from "@/redux/slices/online-member-slice"
import { AppDispatch } from "@/redux/store"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGroupChatOnline = (userid : string) => {
    const dispatch : AppDispatch = useDispatch()

    useEffect(()=>{ 
        const channel = supabaseClient.channel("tracking")

        channel
        .on("presence", {event : "sync"}, ()=> {
            const state : any = channel.presenceState()
            
            for(const user in state) {
                dispatch(onOnline({
                    members : [{id : state[user][0].member.userid}]
                }))
            }
        })
        .subscribe(async (status)=> {
            if (status === "SUBSCRIBED") {
                await channel.track({
                    member : {
                        userid
                    }
                })
            }
        })

        return () => {
            channel.unsubscribe()
        }
    }, [])
}


export const useSearch = (search : "GROUPS" | "POSTS") => {
    const [query, setQuery] = useState<string>("")
    const [debounce, setDebounce] = useState<string>("")

    const dispatch: AppDispatch = useDispatch()

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

    useEffect(() => {
      const delayInputTimeoutId = setTimeout(()=> {
        setDebounce(query)
      }, 1000)

      
      return () => {
        clearTimeout(delayInputTimeoutId)
      }
    }, [query])


    const {refresh, data, isFetched, isFetching} = useQuery({
        queryKey : ["search-data", debounce],
        queryFn : async ({queryKey}) => {
            if (search ===  "GROUPS") {
                const groups = await onSearchGroups(search, queryKey[1])
                return groups
            }
        },
        enabled : false
    })

    if (isFetching) {
        dispatch(onSearch({
            isSearching : true,
            data : []
        }))
    }
    
}