import { GlobalContext } from '@app/Context/store'
import { fireEvent, render, screen } from '@testing-library/react'
import { mockContext } from '../../../utils/mockContext'
import ChatInput from './ChatInput'

beforeEach(() => {
    const mockResponse = {
        id: 3,
        message: 'message 3',
        createdAt: new Date(),
        chatId: 1,
        sentBy: 1,
    }
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockResponse),
        })
    ) as jest.Mock
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe('Chat Input', () => {
    it('renders a chat input', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatInput />
            </GlobalContext.Provider>
        )
    })

    it('types correctly', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatInput />
            </GlobalContext.Provider>
        )

        const chatInput = screen.getByTestId('chat-input')

        fireEvent.change(chatInput, { target: { value: '123' } })

        expect(chatInput.value).toBe('123')
        expect(screen.getByDisplayValue('123')).toBeTruthy()
    })

    it('should send message and call api', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <ChatInput />
            </GlobalContext.Provider>
        )
        const chatInput = screen.getByTestId('chat-input')
        fireEvent.change(chatInput, { target: { value: '123' } })
        const chatSend = screen.getByTestId('chat-send')
        fireEvent.click(chatSend)
        expect(chatInput.value).toBe('')
    })
})
