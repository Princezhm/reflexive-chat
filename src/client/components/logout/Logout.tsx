'use client'
import { useGlobalContext } from '@app/Context/store'
import { useRouter } from 'next/navigation'
import { RiLogoutCircleRLine } from 'react-icons/ri'

export default function Logout() {
    const {
        currentUser,
        setCurrentUser,
        setUsers,
        setChats,
        setCurrentChat,
        setCurrentMessages,
        setUseAI,
    } = useGlobalContext()
    const router = useRouter()

    const logout = () => {
        setCurrentUser(null)
        setUsers([])
        setChats([])
        setCurrentChat(null)
        setCurrentMessages(null)
        setUseAI(true)
        router.push('/login')
    }

    if (!currentUser) return null

    return (
        <div className="ml-4 flex flex-col items-center  text-sky-400 delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:font-bold">
            <RiLogoutCircleRLine
                id="logout"
                className="cursor-pointer text-3xl shadow-sm"
                onClick={() => logout()}
            />
            Logout
        </div>
    )
}
