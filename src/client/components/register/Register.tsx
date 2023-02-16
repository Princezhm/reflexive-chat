'use client'
import { useGlobalContext } from '@app/Context/store'
import CustomInput from '@components/customInput/CustomInput'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RegisterComponent() {
    const [user, setUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rePassword, setRepassword] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const { currentUser, setCurrentUser } = useGlobalContext()
    const router = useRouter()

    useEffect(() => {
        if (currentUser) router.push('/')
    }, [])

    const submit = async () => {
        if (isDisabled()) return

        const res = await fetch(`/auth`, {
            method: 'POST',
            body: JSON.stringify({
                type: 'register',
                user,
                password,
            }),
        })
        const userResponse: User = await res.json()
        if (!userResponse) {
            setError(true)
        } else {
            setCurrentUser(userResponse)
            router.push('/')
        }
    }

    const isDisabled = () => {
        const goodRegister = user && password && password === rePassword

        return !goodRegister
    }

    return (
        <div className="relative flex w-full flex-col justify-center overflow-hidden">
            <div className="m-auto w-full max-w-xl rounded-md bg-sky-900 p-6 shadow-2xl">
                <h1 className="text-center text-3xl font-semibold text-sky-400 underline">
                    Sign Up
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <CustomInput
                            id="login"
                            showLabel
                            label="Username"
                            type="user"
                            value={user}
                            onChange={(e) =>
                                setUser((e.target as HTMLInputElement).value)
                            }
                            onKeyUp={(e) => {
                                e.key === 'Enter' && submit()
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <CustomInput
                            id="password"
                            showLabel
                            label="Password"
                            type="text"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    (e.target as HTMLInputElement).value
                                )
                            }
                            onKeyUp={(e) => {
                                e.key === 'Enter' && submit()
                            }}
                        />
                    </div>

                    <div className="mb-2">
                        <CustomInput
                            id="repassword"
                            showLabel
                            label="Re Password"
                            type="text"
                            value={rePassword}
                            onChange={(e) =>
                                setRepassword(
                                    (e.target as HTMLInputElement).value
                                )
                            }
                            onKeyUp={(e) => {
                                e.key === 'Enter' && submit()
                            }}
                        />
                    </div>

                    {error && (
                        <div id="error" className="mb-2 text-red-500">
                            User already exist
                        </div>
                    )}

                    <div className="mt-6">
                        <button
                            id="submit"
                            type="button"
                            className="w-full transform rounded-md bg-sky-400 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-sky-600 focus:bg-sky-600 focus:outline-none disabled:opacity-25"
                            onClick={(e) => {
                                e.preventDefault()
                                submit()
                            }}
                            disabled={isDisabled()}
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-xs font-light text-slate-100">
                    already have an account?
                    <a
                        id="register"
                        className="cursor-pointer font-medium text-sky-400 hover:underline"
                        onClick={() => router.push('/login')}
                    >
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    )
}
