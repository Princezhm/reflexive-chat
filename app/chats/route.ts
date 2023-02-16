import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

interface NewChat {
    userId: number
    toId: number
}

interface DeleteChat {
    id: number
}

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const req: NewChat = await request.json()

    const { userId, toId } = req

    const newChat = await prisma.chat.create({
        data: {
            ownerId: userId,
            toId,
            createdDate: new Date(),
            deleted: false,
        },
    })

    return NextResponse.json(newChat)
}

export async function DELETE(request: Request) {
    const req: DeleteChat = await request.json()

    const { id } = req

    await prisma.chat.update({
        where: {
            id,
        },
        data: {
            deleted: true,
        },
    })

    return NextResponse.json(true)
}
