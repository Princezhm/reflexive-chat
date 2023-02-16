'use client'
import ChatView from '@components/chatView/ChatView'
import NewChat from '@components/newChat/NewChat'
import Sidebar from '@components/sidebar/Sidebar'
import { Chat } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGlobalContext } from './Context/store'

let intervalId: NodeJS.Timer | null = null

export default function Home() {
    const { currentUser, setChats, chats, setUsers, currentMessages } =
        useGlobalContext()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser) {
            router.push('/login')
            return
        }

        createInterval()

        return () => {
            killInterval()
        }
    }, [])

    useEffect(() => {
        createInterval()

        return () => {
            killInterval()
        }
    }, [currentUser])

    const createInterval = () => {
        if (currentUser && !intervalId) {
            intervalId = setInterval(() => {
                loadUsers()
                loadCurrentChats()
            }, 1000)
        } else if (!currentUser) {
            killInterval()
        }
    }

    const killInterval = () => {
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    const loadUsers = async () => {
        if (!currentUser) return
        const res = await fetch(`/users/${currentUser.id}`, {
            method: 'GET',
        })

        const users = await res.json()
        setUsers(users)
    }

    const loadCurrentChats = async () => {
        if (!currentUser) return
        const res = await fetch(`/chats/${currentUser.id}`, {
            method: 'GET',
        })

        const chats: Chat[] = await res.json()
        setChats(chats)
    }

    if (!currentUser) {
        return null
    }

    return (
        <>
            <Sidebar chats={chats} />
            {currentMessages ? <ChatView /> : <NewChat />}
        </>
    )
}
