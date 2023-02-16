'use client'

import { useGlobalContext } from '@app/Context/store'
import UserIcon from '@components/userIcon/UserIcon'
import { Chat } from '@prisma/client'
import { BsArrow90DegLeft } from 'react-icons/bs'
export default function NewChat() {
    const {
        currentUser,
        users,
        setChats,
        chats,
        setCurrentMessages,
        setCurrentChat,
    } = useGlobalContext()

    const createNewChat = async (id: number) => {
        if (!currentUser) return

        const res = await fetch(`/chats`, {
            method: 'POST',
            body: JSON.stringify({
                userId: currentUser.id,
                toId: id,
            }),
        })
        const chatResponse: Chat = await res.json()

        setChats([chatResponse, ...chats])
        setCurrentChat(chatResponse)
        setCurrentMessages([])
    }

    return (
        <section className="relative flex h-full w-4/6 flex-col items-center justify-center p-4">
            <div className="absolute top-8 left-0 text-3xl text-sky-400">
                <BsArrow90DegLeft />
                continue a previous chat!
            </div>

            <div className="flex w-full flex-col items-center">
                <p className="mb-4  text-lg text-sky-400">
                    Or Start a new chat with another user
                </p>

                <div
                    id="users"
                    className="flex w-full flex-wrap justify-around"
                >
                    {users.map((u) => (
                        <UserIcon key={u.id} user={u} onClick={createNewChat} />
                    ))}
                </div>
            </div>
        </section>
    )
}
