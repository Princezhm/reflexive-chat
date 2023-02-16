import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET(request: Request, { params }) {
    const { chatId } = params

    const chatLookUp = await prisma.message.findMany({
        where: {
            chatId: +chatId,
        },
    })

    return NextResponse.json(chatLookUp || [])
}
