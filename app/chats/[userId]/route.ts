import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET(request: Request, { params }) {
    const { userId } = params

    const chatLookUp = await prisma.chat.findMany({
        where: {
            OR: [
                {
                    ownerId: +userId,
                },
                {
                    toId: +userId,
                },
            ],
            NOT: {
                deleted: true,
            },
        },
        orderBy: {
            createdDate: 'desc',
        },
    })

    return NextResponse.json(chatLookUp || [])
}
