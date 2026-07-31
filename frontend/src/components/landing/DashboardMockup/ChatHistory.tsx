type ChatMessage = {
  id: string
  text: string
}

type ChatHistoryProps = {
  title: string
  messages: ChatMessage[]
}

export function ChatHistory({ title, messages }: ChatHistoryProps) {
  return (
    <aside className="flex w-full flex-col rounded-xl border border-border bg-white lg:w-[280px] xl:w-[300px]">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-bold text-ink">{title}</h3>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3 sm:p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="rounded-2xl rounded-tl-md bg-[#eef0f6] px-3.5 py-2.5 text-[13px] leading-relaxed text-ink"
          >
            {message.text}
          </div>
        ))}
      </div>
    </aside>
  )
}
