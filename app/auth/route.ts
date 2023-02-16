import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

interface authReq {
    type: 'login' | 'register'
    user: string
    password: string
}

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const req: authReq = await request.json()

    if (req.type === 'login') {
        const { user, password } = req
        const userLookUp = await prisma.user.findFirst({
            where: {
                user,
                password,
            },
        })

        return NextResponse.json(userLookUp)
    } else {
        const { user, password } = req
        const userLookUp = await prisma.user.findFirst({
            where: {
                user,
            },
        })

        if (userLookUp) {
            return NextResponse.json(null)
        }

        const newUser = await prisma.user.create({
            data: {
                user,
                password,
                createdAt: new Date(),
            },
        })

        return NextResponse.json(newUser)
    }
}
