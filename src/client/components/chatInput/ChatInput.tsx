'use client'
import { useGlobalContext } from '@app/Context/store'
import { Message } from '@prisma/client'
import { useState } from 'react'
import { TbSend } from 'react-icons/tb'

export default function ChatInput() {
    const {
        currentUser,
        currentChat,
        currentMessages,
        setCurrentMessages,
        useAI,
    } = useGlobalContext()
    const [text, setText] = useState<string>('')

    const send = async () => {
        if (!currentUser || !currentChat || !text) return

        setText('')

        const res = await fetch(`/messages`, {
            method: 'POST',
            body: JSON.stringify({
                message: text,
                chatId: currentChat.id,
                sentBy: currentUser.id,
                dummyAI: !useAI,
            }),
        })
        const messageResponse: Message = await res.json()

        setCurrentMessages([...(currentMessages || []), messageResponse])
    }

    const disabled = () => {
        if (!text) return true
    }

    return (
        <div className="flex h-12 content-center items-center rounded-xl border-2 border-sky-800/50 px-3 text-slate-200">
            <input
                id="chat-input"
                data-testid="chat-input"
                className="w-full bg-transparent text-slate-50 focus-visible:outline-none"
                value={text}
                onChange={(e) => {
                    setText((e.target as HTMLInputElement).value)
                }}
                onKeyUp={(e) => {
                    e.key === 'Enter' && send()
                }}
            />
            {!disabled() && (
                <TbSend
                    id="chat-send"
                    data-testid="chat-send"
                    className="cursor-pointer text-xl"
                    onClick={() => send()}
                />
            )}
        </div>
    )
}
