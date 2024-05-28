import React from 'react'
import ChatInput from './ChatInput'

interface ChatWrapperProps {
  fileId: string
  isSubscribed: boolean
}

export default function ChatWrapper({
  fileId,
  isSubscribed,
}: ChatWrapperProps) {
  return (
    <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
      <div className='flex-1 justify-between flex flex-col mb-28'>
      </div>

      <ChatInput />
    </div>


  )
}