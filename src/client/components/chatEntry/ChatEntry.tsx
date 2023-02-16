import { useGlobalContext } from '@app/Context/store'
import { Message } from '@prisma/client'

interface ChatEntryprop {
    message: Message
}

export default function ChatEntry({ message }: ChatEntryprop) {
    const { currentUser, users, currentChat } = useGlobalContext()

    const getWho = () => {
        const obj = {
            side: 'right',
            justify: 'justify-end',
            name: currentUser?.user || '',
        }
        if (!currentUser || !currentChat) {
            return obj
        }

        const [user] = users.filter((u) => u.id === message.sentBy)

        if (user) {
            obj.name = user.user
        }

        if (message.sentBy !== currentUser.id) {
            obj.side = 'left'
            obj.justify = 'justify-start'
        }

        return obj
    }

    const { justify, side, name } = getWho()

    return (
        <div className={`flex ${justify}`}>
            <div className={`bubble ${side}`}>
                <div className="mb-3 flex items-center justify-between">
                    <span data-testid="name" className="font-bold underline">
                        {name} says:
                    </span>
                    <span className="text-xs">
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                        }).format(new Date(message.createdAt))}
                    </span>
                </div>
                <span data-testid="message">{message.message}</span>
            </div>
        </div>
    )
}
