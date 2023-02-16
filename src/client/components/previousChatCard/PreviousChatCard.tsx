'use client'
import { useGlobalContext } from '@app/Context/store'
import { Chat } from '@prisma/client'
import { FaRegTrashAlt, FaTelegramPlane } from 'react-icons/fa'

interface PreviousChatCardProps {
    chat: Chat
}

export default function PreviousChatCard({ chat }: PreviousChatCardProps) {
    const {
        users,
        currentUser,
        currentChat,
        chats,
        currentMessages,
        setCurrentMessages,
        setCurrentChat,
        setChats,
    } = useGlobalContext()

    const getTo = () => {
        if (chat.ownerId !== currentUser?.id) {
            return 'Me!'
        }
        const [user] = users.filter((u) => u.id === chat.toId)

        if (user) {
            return user.user
        }

        return 'Uknown'
    }

    const getFrom = () => {
        if (chat.ownerId === currentUser?.id) {
            return 'Me!'
        }

        const [user] = users.filter((u) => u.id === chat.ownerId)

        if (user) {
            return user.user
        }

        return 'Uknown'
    }

    const loadMessages = async () => {
        if (!currentUser) return

        const res = await fetch(`/messages/${chat.id}`)

        const messages = await res.json()
        if (messages) {
            setCurrentMessages(messages)
            setCurrentChat(chat)
        }
    }

    const deleteChat = async () => {
        if (!currentUser || !chat) return

        const res = await fetch(`/chats`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: chat.id,
            }),
        })

        if (currentMessages?.some((m) => m.chatId === chat.id)) {
            setCurrentMessages(null)
        }
        setChats(chats.filter((c) => c.id !== chat.id))

        await res.json()
    }

    const to = getTo()
    const from = getFrom()

    const border =
        currentChat?.id === chat.id
            ? 'border-2 border-sky-400 selected'
            : 'border-sky-800/50 border'

    return (
        <div
            className={`min-h-20 mb-4 flex flex-col rounded-xl  bg-sky-200/10 px-4 py-2 text-slate-200 ${border}`}
        >
            <p className="mb-1 text-xs">
                <b className="text-sm">Title: </b>{' '}
                {to ? `Chat with ${to}` : 'chat with some user...'}
            </p>
            <p className="mb-1 text-xs">
                <b className="text-sm">Date: </b>{' '}
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                }).format(new Date(chat.createdDate))}
            </p>
            <p className="mb-1 text-xs">
                <b className="text-sm">From: </b> {from}
            </p>
            <p className="mb-1 text-xs">
                <b className="text-sm">To: </b> {to}
            </p>
            <div className="flex flex-row-reverse">
                <FaTelegramPlane
                    id="open-chat"
                    className="cursor-pointer self-end text-2xl"
                    onClick={() => loadMessages()}
                />
                <FaRegTrashAlt
                    id="delete-chat"
                    className="cursor-pointer self-end text-2xl"
                    onClick={() => deleteChat()}
                />
            </div>
        </div>
    )
}
