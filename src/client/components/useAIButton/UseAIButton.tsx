'use client'
import { useGlobalContext } from '@app/Context/store'
import { BiBrain } from 'react-icons/bi'
import { GiArtificialIntelligence } from 'react-icons/gi'

export default function UseAIButton() {
    const { useAI, setUseAI, currentUser } = useGlobalContext()

    if (!currentUser) return null

    const ButtonIcon = useAI ? GiArtificialIntelligence : BiBrain
    const text = useAI ? 'Smart AI' : 'Dummy AI'

    return (
        <div
            id="ai-selector"
            className="flex flex-col items-center  text-sky-400 delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:font-bold"
        >
            <ButtonIcon
                className="cursor-pointer text-3xl shadow-sm"
                onClick={() => setUseAI(!useAI)}
            />
            {text}
        </div>
    )
}
