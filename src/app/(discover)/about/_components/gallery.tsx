import React from 'react'

type Props = {
    gallery : string[]
    onActive(media : {url : string | undefined; type : string}) : void
    userid : string
    groupUserid : string
}

const MediaGallery = ({
    gallery,
    groupUserid,
    groupid,
    onActive,
    userid
}: Props) => {
  return (
    <div>MediaGallery</div>
  )
}

export default MediaGallery