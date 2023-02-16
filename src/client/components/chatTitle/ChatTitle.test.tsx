import { GlobalContext } from '@app/Context/store'
import { fireEvent, render, screen } from '@testing-library/react'
import { mockContext } from '../../../utils/mockContext'
import ChatTitle from './ChatTitle'

describe('Chat Title', () => {
    it('renders a chat title', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatTitle />
            </GlobalContext.Provider>
        )
    })

    it('shows title text', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatTitle />
            </GlobalContext.Provider>
        )

        const chatTitle = screen.getByTestId('chat-title')

        const hasText = chatTitle.innerHTML.includes(
            'Welcome to your chat with: AI'
        )

        expect(hasText).toBeTruthy()
    })
})
