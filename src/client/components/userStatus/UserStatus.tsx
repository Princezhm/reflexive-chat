'use client'
import { useGlobalContext } from '@app/Context/store'
import { FaUserSlash, FaUserTie } from 'react-icons/fa'

export default function UserStatus() {
    const { currentUser } = useGlobalContext()

    const ButtonIcon = currentUser ? FaUserTie : FaUserSlash
    const text = currentUser ? currentUser.user : 'No User'

    return (
        <div className="ml-4 flex flex-col items-center  text-sky-400 delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:font-bold">
            <ButtonIcon className="cursor-pointer text-3xl shadow-sm" />
            {text}
        </div>
    )
}
