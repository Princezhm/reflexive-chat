'use client'
import { Chat, Message, User } from '@prisma/client'
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
} from 'react'

export interface ContextProps {
    currentUser: User | null
    setCurrentUser: Dispatch<SetStateAction<User | null>>
    users: User[]
    setUsers: Dispatch<SetStateAction<User[]>>
    chats: Chat[]
    setChats: Dispatch<SetStateAction<Chat[]>>
    currentChat: Chat | null
    setCurrentChat: Dispatch<SetStateAction<Chat | null>>
    currentMessages: Message[] | null
    setCurrentMessages: Dispatch<SetStateAction<Message[] | null>>
    useAI: boolean
    setUseAI: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<ContextProps>({
    currentUser: null,
    setCurrentUser: (): User | null => null,
    users: [],
    setUsers: (): User[] => [],
    chats: [],
    setChats: (): Chat[] => [],
    currentChat: null,
    setCurrentChat: (): Chat | null => null,
    currentMessages: [],
    setCurrentMessages: (): Message[] => [],
    useAI: false,
    setUseAI: (): boolean => false,
})

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [currentChat, setCurrentChat] = useState<Chat | null>(null)
    const [chats, setChats] = useState<Chat[]>([])
    const [currentMessages, setCurrentMessages] = useState<Message[] | null>(
        null
    )
    const [useAI, setUseAI] = useState<boolean>(true)

    return (
        <GlobalContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                users,
                setUsers,
                currentChat,
                setCurrentChat,
                chats,
                setChats,
                currentMessages,
                setCurrentMessages,
                useAI,
                setUseAI,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
