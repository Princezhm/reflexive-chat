'use client'
import Header from '@components/header/Header'
import type { ReactNode } from 'react'
import '../styles/globals.scss'
import { GlobalContextProvider } from './Context/store'

interface MainLayoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: MainLayoutProps) {
    return (
        <html className="bg-gray-800">
            <body className="scrollbar h-screen overflow-x-hidden bg-gray-800 font-mono">
                <div className="relative flex h-screen flex-col items-center">
                    <GlobalContextProvider>
                        <Header />
                        <main className="flex h-[90%] w-screen pt-4">
                            {children}
                        </main>
                    </GlobalContextProvider>
                </div>
            </body>
        </html>
    )
}
