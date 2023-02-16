import { User } from '@prisma/client'
import { FaUserCircle } from 'react-icons/fa'
import { GiArtificialIntelligence } from 'react-icons/gi'

interface UserIconProps {
    user: User
    onClick: (id: number) => Promise<void>
}

export default function UserIcon({ user, onClick }: UserIconProps) {
    const { id } = user

    const Icon = id === 1 ? GiArtificialIntelligence : FaUserCircle

    return (
        <div
            className="usericon mb-3 flex flex-shrink-0 flex-grow basis-1/6 cursor-pointer flex-col items-center text-slate-300 delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:font-bold"
            onClick={() => onClick(user.id)}
        >
            <Icon className="text-3xl" />
            {user.user}
        </div>
    )
}
