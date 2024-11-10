"use client"
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface ChatMessageProps {
  body?: string
  time: string
  imageSrc?: string
}

export default function ChatMessage({ body, time, imageSrc }: ChatMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="group relative flex flex-col gap-2 sm:gap-3 p-3 sm:p-6 transition-all hover:bg-gray-50/50">
      {/* Time Badge */}
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100">
          <svg 
            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <span className="text-xs sm:text-sm font-medium text-gray-500">
          {formatDate(time)}
        </span>
      </div>

      {/* Message Content with Image */}
      <div className="ml-8 sm:ml-10 flex items-start gap-4">
        {body && (
          <div className="flex-grow space-y-2 sm:space-y-3">
            <div className="prose prose-sm max-w-none rounded-lg bg-white p-3 sm:p-4 shadow-sm ring-1 ring-gray-100">
              <p className="text-sm sm:text-base text-gray-700">{body}</p>
            </div>
          </div>
        )}
        
        {/* Thumbnail Image with Hover/Click Expansion */}
        {imageSrc && (
          <div className="relative">
            {/* Thumbnail - made smaller */}
            <div 
              className="h-12 w-12 rounded-lg overflow-hidden ring-1 ring-gray-100 cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all"
              onClick={() => setIsExpanded(true)}
            >
              <Image 
                src={imageSrc}
                alt="Chart visualization"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Expanded Image Overlay - made larger */}
            {isExpanded && (
              <div 
                className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center cursor-pointer"
                onClick={() => setIsExpanded(false)}
              >
                <div className="relative w-[90vw] max-w-7xl aspect-[16/9] bg-white rounded-lg p-2">
                  <Image 
                    src={imageSrc}
                    alt="Chart visualization"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 