import { GlobalContext } from '@app/Context/store'
import { render, screen } from '@testing-library/react'
import { mockContext } from '../../../utils/mockContext'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
    it('renders a sidebar', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <Sidebar chats={mockContext.chats} />
            </GlobalContext.Provider>
        )
    })

    it('renders all chat entries', () => {
        render(
            <GlobalContext.Provider value={mockContext}>
                <Sidebar chats={mockContext.chats} />
            </GlobalContext.Provider>
        )

        const chats = screen.getByTestId('sidebar')
        expect(chats.children.length).toBe(mockContext.chats.length)
    })
})
