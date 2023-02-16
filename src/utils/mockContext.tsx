import { ContextProps } from '@app/Context/store'

export const mockContext: ContextProps = {
    currentUser: {
        id: 2,
        user: 'test',
        password: 'test',
        createdAt: new Date(),
    },
    setCurrentUser: jest.fn(),
    users: [
        {
            id: 1,
            user: 'AI',
            password: '',
            createdAt: new Date(),
        },
        {
            id: 3,
            user: 'test 2',
            password: 'test 2',
            createdAt: new Date(),
        },
    ],
    setUsers: () => [],
    currentChat: {
        id: 1,
        ownerId: 2,
        toId: 1,
        createdDate: new Date(),
        deleted: false,
    },
    setCurrentChat: jest.fn(),
    chats: [
        {
            id: 1,
            ownerId: 2,
            toId: 1,
            createdDate: new Date(),
            deleted: false,
        },
    ],

    setChats: jest.fn(),
    currentMessages: [
        {
            id: 1,
            message: 'message 1',
            createdAt: new Date(),
            chatId: 1,
            sentBy: 2,
        },
        {
            id: 2,
            message: 'message 2',
            createdAt: new Date(),
            chatId: 1,
            sentBy: 1,
        },
    ],
    setCurrentMessages: jest.fn(),
    useAI: false,
    setUseAI: jest.fn(),
}
