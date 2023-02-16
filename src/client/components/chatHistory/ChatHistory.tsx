'use client'
import { useGlobalContext } from '@app/Context/store'
import ChatEntry from '@components/chatEntry/ChatEntry'
import { Message } from '@prisma/client'
import { useEffect } from 'react'

let intervalId: NodeJS.Timer | null = null

export default function ChatHistory() {
    const {
        currentMessages,
        currentChat,
        chats,
        setCurrentMessages,
        setCurrentChat,
    } = useGlobalContext()

    useEffect(() => {
        createInterval()

        return () => {
            killInterval()
        }
    }, [])

    useEffect(() => {
        createInterval()

        if (currentChat) {
            const exist = chats.some((c) => c.id === currentChat.id)

            if (!exist) {
                setCurrentChat(null)
                setCurrentMessages(null)
            }
        } else {
            setCurrentMessages(null)
        }

        return () => {
            killInterval()
        }
    }, [currentChat, chats])

    const createInterval = () => {
        if (currentChat && !intervalId) {
            intervalId = setInterval(() => fetchMessages(), 1000)
        } else if (!currentChat) {
            killInterval()
        }
    }

    const killInterval = () => {
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    const fetchMessages = async () => {
        if (!currentMessages || !currentChat) return

        const res = await fetch(`/messages/${currentChat.id}`)

        const messages: Message[] = await res.json()

        if (messages.length >= currentMessages.length) {
            setCurrentMessages(messages)
        }
    }

    if (!currentMessages) return null

    return (
        <div className=" scrollbar h-[80%] w-full p-4">
            <div className="scrollbar h-full overflow-auto">
                <div className="my-2 px-4" data-testid="chats">
                    {currentMessages.map((m) => (
                        <ChatEntry key={m.id} message={m} />
                    ))}
                </div>
            </div>
        </div>
    )
}
