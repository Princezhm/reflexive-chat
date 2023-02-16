import { useGlobalContext } from '@app/Context/store'
import { FaHandSparkles } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

export default function ChatTitle() {
    const { currentChat, users, setCurrentChat, setCurrentMessages } =
        useGlobalContext()

    const getTo = () => {
        if (!currentChat) return ''
        const [user] = users.filter(
            (u) => u.id === currentChat.toId || u.id === currentChat.ownerId
        )

        if (user) {
            return user.user
        }

        return ''
    }

    const closeChat = () => {
        setCurrentChat(null)
        setCurrentMessages(null)
    }

    return (
        <div className="flex items-center justify-between border-b-2 border-b-sky-800/50 p-3 text-slate-200">
            <div className="flex" data-testid="chat-title">
                <FaHandSparkles className="mr-2 text-xl" /> Welcome to your chat
                with: {getTo()}
            </div>
            <ImCross
                className="cursor-pointer text-xl"
                onClick={() => closeChat()}
            />
        </div>
    )
}
