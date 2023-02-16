import { GlobalContext } from '@app/Context/store'
import { render, screen } from '@testing-library/react'
import { mockContext } from '../../../utils/mockContext'
import ChatEntry from './ChatEntry'

describe('Chat Entry', () => {
    it('renders a chat entry', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatEntry
                    message={{
                        id: 1,
                        message: 'this is a test',
                        createdAt: new Date(),
                        chatId: 1,
                        sentBy: 2,
                    }}
                />
            </GlobalContext.Provider>
        )
    })

    it('render owner chat name', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatEntry
                    message={{
                        id: 1,
                        message: 'this is a test',
                        createdAt: new Date(),
                        chatId: 1,
                        sentBy: 2, //me!
                    }}
                />
            </GlobalContext.Provider>
        )

        const user = mockContext.currentUser

        const nameContainer = screen.getByTestId('name')

        expect(nameContainer.innerHTML).toBe(`${user?.user} says:`)
    })

    it('renders counterparty name', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatEntry
                    message={{
                        id: 1,
                        message: 'this is a test',
                        createdAt: new Date(),
                        chatId: 1,
                        sentBy: 1, // AI
                    }}
                />
            </GlobalContext.Provider>
        )

        const nameContainer = screen.getByTestId('name')

        expect(nameContainer.innerHTML).toBe(`AI says:`)
    })

    it('renders message properly', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatEntry
                    message={{
                        id: 1,
                        message: 'this is a test',
                        createdAt: new Date(),
                        chatId: 1,
                        sentBy: 2,
                    }}
                />
            </GlobalContext.Provider>
        )

        const messageContainer = screen.getByTestId('message')

        expect(messageContainer.innerHTML).toBe(`this is a test`)
    })
})
