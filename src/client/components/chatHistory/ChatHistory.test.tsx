import { GlobalContext } from '@app/Context/store'
import { render, screen } from '@testing-library/react'
import { mockContext } from '../../../utils/mockContext'
import ChatHistory from './ChatHistory'

describe('Chat History', () => {
    it('renders a chat History', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatHistory />
            </GlobalContext.Provider>
        )
    })

    it('renders all chat entries', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatHistory />
            </GlobalContext.Provider>
        )

        const chats = screen.getByTestId('chats')
        expect(chats.children.length).toBe(mockContext.currentMessages?.length)
    })
})
