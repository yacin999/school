/* eslint-disable @typescript-eslint/no-explicit-any */
import { onGetGroupInfo, onSearchGroups, onUpDateGroupSettings } from "@/actions/groups"
import { supabaseClient } from "@/lib/utils"
import { onOnline } from "@/redux/slices/online-member-slice"
import { onClearSearch, onSearch } from "@/redux/slices/search-slice"
import { AppDispatch } from "@/redux/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { JSONContent } from "novel"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { GroupSettingsSchema } from "@/components/forms/group-settings/schema"
import { toast } from "sonner"
import { upload } from "@/lib/uploadcare"
import { useRouter } from "next/navigation"

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


    const { refetch, data, isFetched, isFetching } = useQuery({
        queryKey: ["search-data", debounce],
        queryFn: async ({ queryKey }) => {
          if (search === "GROUPS") {
            const groups = await onSearchGroups(search, queryKey[1])
            return groups
          }else if (search === "POSTS") {
            const posts = await onSearchGroups(search, queryKey[1])
            return posts
          }
        },
        enabled: false,
      })

    if (isFetching) {
        dispatch(onSearch({
            isSearching : true,
            data : []
        }))
    }

    if (isFetched) {
        dispatch(
          onSearch({
            isSearching: false,
            status: data?.status as number,
            data: data?.groups || [],
            debounce,
          }),
        )
    }    

    useEffect(() => {
        if (debounce) refetch()
        if(!debounce) dispatch(onClearSearch())
    
    }, [refetch, dispatch, debounce])

    return {query, onSearchQuery}
    
}


export const useGroupSettings = (groupid : string) => {
  const { data } = useQuery({
    queryKey : ["group-info"],
    queryFn : () => onGetGroupInfo(groupid)
  })

  const jsonContent = data?.group?.jsonDescription !== null ? JSON.parse(data?.group?.jsonDescription as string) : undefined

  const [onJsonDescription, setJsonDescription] = useState<JSONContent | undefined>(jsonContent)

  const [onDescription, setOnDescription] = useState<string | undefined>(data?.group?.description || undefined)

  
  
  const {
    register,
    formState : {errors},
    handleSubmit,
    watch,
    setValue
  } = useForm<z.infer<typeof GroupSettingsSchema>>({
    resolver : zodResolver(GroupSettingsSchema),
    mode : "onChange",
  })

  const [previewIcon, setPreviewIcon] = useState<string | undefined>(undefined)
  const [previewThumbnail, setPreviewThumbnail] = useState<string | undefined>(undefined)

  useEffect(() => {
    const previews = watch(({thumbnail, icon})=> {
      if (!icon) return
      if (icon[0]) {
        setPreviewIcon(URL.createObjectURL(icon[0]))
      }

      if (thumbnail[0]) {
        setPreviewThumbnail(URL.createObjectURL(thumbnail[0]))
      }
    })
  
    return () => {
      previews.unsubscribe()
    }
  }, [watch])

  const onSetDescriptions = () => {
    const JsonContent = JSON.stringify(onJsonDescription)
    setValue("jsondescription", JsonContent)
    setValue("description", onDescription)
  }

  useEffect(() => {
    onSetDescriptions()
    return () => {
      onSetDescriptions()
    }
  }, [onJsonDescription, onDescription])
  

 

  const {mutate : update, isPending } = useMutation({
    mutationKey : ["group-settings"],
    mutationFn : async (values : z.infer<typeof GroupSettingsSchema>) => {
      if (values.thumbnail && values.thumbnail.length > 0) {
        const uploaded = await upload.uploadFile(values.thumbnail[0]) 
        const updated = await onUpDateGroupSettings(
          groupid,
          "IMAGE",
          uploaded.uuid,
          `/group/${groupid}/settings`
        )
        if (updated.status !== 200) {
          return toast("Error", {
            description : "Oops! your form looks like is empty"
          })
        }        
      }
      if (values.icon && values.icon.length > 0 ) {
        const uploaded = await upload.uploadFile(values.icon[0]) 
        const updated = await onUpDateGroupSettings(
          groupid,
          "ICON",
          uploaded.uuid,
          `/group/${groupid}/settings`
        )

        if (updated.status !== 200) {
          return toast("Error", {
            description : "Oops! your form looks like is empty"
          })
        }
      }
      if ( values.name ) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "NAME",
          values.name,
          `/group/${groupid}/settings`
        )

        if (updated.status !== 200) {
          return toast("Error", {
            description : "Oops! your form looks like is empty"
          })
        }
      }
      if ( values.description ) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "DESCRIPTION",
          values.description,
          `/group/${groupid}/settings`
        )

        if (updated.status !== 200) {
          return toast("Error", {
            description : "Oops! your form looks like is empty"
          })
        }
      }
      if ( values.jsondescription ) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "JSONDESCRIPTION",
          values.jsondescription,
          `/group/${groupid}/settings`
        )

        if (updated.status !== 200) {
          return toast("Error", {
            description : "Oops! your form looks like is empty"
          })
        }
      }
      if ( values.htmldescription ) {
        const updated = await onUpDateGroupSettings(
          groupid,
          "HTMLDESCRIPTION",
          values.htmldescription,
          `/group/${groupid}/settings`
        )

        if (updated.status !== 200) {
          return toast("Error", {
            description : "Oops! your form looks like is empty"
          })
        }
      }
      if (
        !values.description &&
        !values.name &&
        !values.icon &&
        !values.htmldescription &&
        !values.jsondescription &&
        !values.thumbnail
      ) {
        return toast("Error", {
          description : "Oops! your form looks like is empty"
        })
      }

      return toast("Success", {
        description : "Group data updated"
      })
    }


  })

  const router = useRouter()

  const onUpdate = handleSubmit(async (values) => update(values))

  if (data?.status !== 200 ) router.push("/group/create")

  return {
    data,
    register,
    errors,
    isPending,
    onUpdate,
    previewIcon,
    previewThumbnail,
    setPreviewThumbnail,
    onJsonDescription,
    setJsonDescription,
    setOnDescription,
    onDescription
  }
}