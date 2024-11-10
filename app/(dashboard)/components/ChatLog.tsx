import ChatMessage from './ChatMessage'

interface Message {
  body?: string
  time: string
  imageSrc?: string
}

interface ChatLogProps {
  messages: Message[]
}

export default function ChatLog({ messages }: ChatLogProps) {
  return (
    <div className="divide-y divide-gray-100 rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
      <div className="sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex items-center justify-between bg-white/80 px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500" />
            <h4 className="text-sm sm:text-base font-semibold text-gray-900">Real-time market insights</h4>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            {messages.length} messages
          </div>
        </div>
      </div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto sm:max-h-none sm:overflow-y-visible">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            body={message.body}
            time={message.time} 
            imageSrc={message.imageSrc}
          />
        ))}
      </div>
    </div>
  )
}