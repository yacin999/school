"use client"

import { EditorContent, EditorRoot, JSONContent } from 'novel'
import React, { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import HtmlParser from '../html-parser'
import { CharacterCount, handleCommandNavigation, Placeholder } from "novel/extensions"
import { cn } from '@/lib/utils'
import { defaultExtensions } from './extentions'
import { slashCommand } from './slash-command'
import { Video } from "./video"
import { Image } from './image'

type Props = {
    content : JSONContent | undefined
    setContent : React.Dispatch<React.SetStateAction<JSONContent | undefined>>
    min : number
    max : number
    name : string 
    errors : FieldErrors
    textContent : string | undefined
    setTextContent : React.Dispatch<React.SetStateAction<string | undefined>>
    onEdit? : boolean
    inline? : boolean
    disabled? : boolean
    htmlContent? : string | undefined
    setHtmlContent? : React.Dispatch<React.SetStateAction<string | undefined>> 
}

const BlockTextEditor = ({
    content,
    setContent,
    min,
    max,
    name,
    errors,
    textContent,
    setTextContent,
    onEdit,
    inline,
    disabled,
    htmlContent,
    setHtmlContent
}: Props) => {
    const [openNode, setOpenNode] = useState<boolean>(false)
    const [openLink, setopenLink] = useState<boolean>(false)
    const [openColor, setopenColor] = useState<boolean>(false)
    const [characters, setCharacters] = useState<number | undefined>(textContent?.length || undefined)
  return (
    <div>
      {" "}
      {htmlContent && !onEdit && inline ? (
        <HtmlParser html={htmlContent}/>
      ) : (
        <EditorRoot>
          <EditorContent
            className={cn(
              inline ? onEdit && "mb-5" : "border-[1px] rounded-xl px-10 py-5 text-base border-themeGray bg-themeBlack w-full"
            )}
            initialContent={content}
            editorProps={{
              editable : () => !disabled as boolean,
              handleDOMEvents : {
                keydown : (_view, event) => handleCommandNavigation(event)
              },
              attributes : {
                class : `prose prose-lg dark:prose-invert focus:outline-none max-w-full [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl text-themeTextGray`
              }
            }}  
            onUpdate={({editor}) => {
              const json = editor.getJSON()
              const text = editor.getText()

              if (setHtmlContent) {
                const html = editor.getHTML()
                setHtmlContent(html)
              }
              setContent(json)
              setTextContent(text)
              setCharacters(text.length)
            }}
            extensions={[
              ...defaultExtensions,
              slashCommand,
              CharacterCount.configure({
                limit : max
              }),
              Placeholder.configure({
                placeholder : "Type / to inesrt element..."
              }),
              Video,
              Image
            ]}
          >

          </EditorContent>
        </EditorRoot>
      )}
    </div>
  )
}

export default BlockTextEditor