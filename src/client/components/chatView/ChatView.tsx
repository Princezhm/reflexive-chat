import ChatHistory from '@components/chatHistory/ChatHistory'
import ChatInput from '@components/chatInput/ChatInput'
import ChatTitle from '@components/chatTitle/ChatTitle'

export default function ChatView() {
    return (
        <section className="h-full w-4/6 p-4">
            <div className="flex h-full flex-col justify-between rounded-3xl border-2 border-sky-800/50 p-4">
                <ChatTitle />
                <ChatHistory />
                <ChatInput />
            </div>
        </section>
    )
}
