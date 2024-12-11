import { onCreateChannelPost, onDeleteChannel, onGetChannelInfo, onUpdateChannelInfo } from "@/actions/channels"
import { CreateChannelPost } from "@/components/global/post-content/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useMutationState, useQuery, useQueryClient } from "@tanstack/react-query"
import { JSONContent } from "novel"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { v4 } from "uuid"
import { z } from "zod"


export const useChannelInfo = (groupId : string) => {
    const channelRef = useRef<HTMLAnchorElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const [channel, setChannel] = useState<string | undefined>(undefined)
    const [edit, setEdit] = useState<boolean>(false)
    const [icon, setIcon] = useState<string | undefined>(undefined)
    const client = useQueryClient()

    const onEditChannel = (id : string | undefined) => {
        setChannel(id)
        setEdit(true)
    }

    const onSetIcon = (icon : string | undefined) => setIcon(icon)


    const {isPending, mutate, variables} = useMutation({
        mutationFn : (data : { name? : string, icon? : string}) => onUpdateChannelInfo(channel!, data.name, data.icon),
        onMutate : () => {
            setEdit(false)
            onSetIcon(undefined)
        },
        onSuccess : (data) => {
            return toast(data.status !== 200 ? "Error" : "Success", {
                description : data.message
            })
        },
        onSettled : async() => {
            await client.invalidateQueries({
                queryKey : ["group-channels", groupId]
            })
            await client.refetchQueries({ queryKey: ["group-channels", groupId], exact: true });
        }
    })


    const {variables : deleteVariables, mutate : deleteMutation } = useMutation({
        mutationFn : (data : {id : string}) => onDeleteChannel(data.id),
        onSuccess : (data) => {
            return toast(data.status !== 200 ? "Error" : "Success", {
                description : data.message
            })
        }, 
        onSettled : async () => {
            await client.invalidateQueries({
                queryKey : ["group-channels", groupId]
            })
            await client.refetchQueries({ queryKey: ["group-channels", groupId], exact: true });
        }
    })

    const onEndChannelEdit = (event: Event) => {
        if (inputRef.current && channelRef.current && triggerRef.current) {
          if (
            !inputRef.current.contains(event.target as Node | null) &&
            !channelRef.current.contains(event.target as Node | null) &&
            !triggerRef.current.contains(event.target as Node | null) &&
            !document.getElementById("icon-list")
          ) {
            if (inputRef.current.value) {
                console.log("from input listener", inputRef.current.value)
              mutate({
                name: inputRef.current.value,
              })
            }
            if (icon) {
              mutate({ icon })
            } else {
              setEdit(false)
            }
          }
        }
      }
    useEffect(()=> {
        document.addEventListener("click", onEndChannelEdit, false)

        return () => document.removeEventListener("click", onEndChannelEdit, false)
    }, [icon])

    const onChannelDelete = (id : string) => deleteMutation({id})

    return {
        channel,
        onEditChannel,
        channelRef,
        edit,
        inputRef,
        variables,
        isPending,
        triggerRef,
        onSetIcon,
        icon,
        onChannelDelete,
        deleteVariables
    }
}


export const useChannelPage = (channelid: string) => {
  const { data } = useQuery({
    queryKey: ["channel-info"],
    queryFn: () => onGetChannelInfo(channelid),
  })

  const mutation = useMutationState({
    filters: { mutationKey: ["create-post"], status: "pending" },
    select: (mutation) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        state: mutation.state.variables as any,
        status: mutation.state.status,
      }
    },
  })

  return { data, mutation }
}


export const useCreateChannelPost = (channelid: string) => {
  const [onJsonDescription, setJsonDescription] = useState<
    JSONContent | undefined
  >(undefined)

  const [onDescription, setOnDescription] = useState<string | undefined>(
    undefined,
  )

  const [onHtmlDescription, setOnHtmlDescription] = useState<
    string | undefined
  >(undefined)

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<z.infer<typeof CreateChannelPost>>({
    resolver: zodResolver(CreateChannelPost),
  })

  const onSetDescriptions = () => {
    const JsonContent = JSON.stringify(onJsonDescription)
    setValue("jsoncontent", JsonContent)
    setValue("content", onDescription)
    setValue("htmlcontent", onHtmlDescription)
  }

  useEffect(() => {
    onSetDescriptions()
    return () => {
      onSetDescriptions()
    }
  }, [onJsonDescription, onDescription])

  const client = useQueryClient()

  const { mutate, variables, isPending } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: (data: {
      title: string
      content: string
      htmlcontent: string
      jsoncontent: string
      postid: string
    }) =>
      onCreateChannelPost(
        channelid,
        data.title,
        data.content,
        data.htmlcontent,
        data.jsoncontent,
        data.postid,
      ),
    onSuccess: (data) => {
      setJsonDescription(undefined)
      setOnHtmlDescription(undefined)
      setOnDescription(undefined)
      toast(data.status === 200 ? "Success" : "Error", {
        description: data.message,
      })
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["channel-info"],
      })
    },
  })

  const onCreatePost = handleSubmit(async (values) =>
    mutate({
      title: values.title,
      content: values.content!,
      htmlcontent: values.htmlcontent!,
      jsoncontent: values.jsoncontent!,
      postid: v4(),
    }),
  )

  return {
    onJsonDescription,
    onDescription,
    onHtmlDescription,
    setOnDescription,
    setOnHtmlDescription,
    setJsonDescription,
    register,
    errors,
    variables,
    isPending,
    onCreatePost,
  }
}