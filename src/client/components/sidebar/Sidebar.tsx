import PreviousChatCard from '@components/previousChatCard/PreviousChatCard'
import { Chat } from '@prisma/client'

interface SidebarProps {
    chats: Chat[]
}

export default function Sidebar({ chats = [] }: SidebarProps) {
    return (
        <aside className="h-full w-2/6 p-4">
            <div
                id="sidebar"
                className="scrollbar h-full overflow-auto rounded-3xl border-2 border-sky-800/50 px-4 py-2"
                data-testid="sidebar"
            >
                {chats.map((c) => (
                    <PreviousChatCard key={c.id} chat={c} />
                ))}
            </div>
        </aside>
    )
}
