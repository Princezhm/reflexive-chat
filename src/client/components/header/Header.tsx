import Logout from '@components/logout/Logout'
import UseAIButton from '@components/useAIButton/UseAIButton'
import UserStatus from '@components/userStatus/UserStatus'

export default function Header() {
    return (
        <header className="h-20 min-h-[5rem] w-full shadow-lg shadow-sky-400/10">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
                <div>
                    <div className="flex items-center justify-between py-3 md:block md:py-5">
                        <h2 className="text-2xl font-bold text-sky-400">
                            ReflexAi Chat
                        </h2>
                    </div>
                </div>
                <div className="flex">
                    <UseAIButton />
                    <UserStatus />
                    <Logout />
                </div>
            </div>
        </header>
    )
}
//box-shadow: 0px 10px 5px 0px rgba(10,189,159,0.76)
