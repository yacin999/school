import { Card } from '@/components/ui/card'
import { truncateString } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    id : string
    description : string
    thumbnail : string | null
    preview : string
    name? : string
}

const GroupCard = ({
    id,
    description,
    thumbnail,
    name,
    preview,

}: Props) => {
  return (
    <Link href={`/about/${id}`}>
        <Card className='bg-themeBlack border-themeGray rounded-xl overflow-hidden'>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
            src={preview || `https://ucarecdn.com/${thumbnail}/`}
            alt="thumbnail"
            className="w-full opacity-70 h-56"
            />
            <div className='p-6'>
                <h3 className='text-lg text-themeTextGray font-bold'>
                    {name}
                </h3>
                <p className='text-base text-themeTextGray'>
                    {description && truncateString(description)}
                </p>
            </div>
        </Card>
    </Link>
  )
}

export default GroupCard