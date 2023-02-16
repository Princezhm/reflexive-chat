import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }) {
    const { userId } = params

    const userLookUp = await prisma.user.findMany()

    return NextResponse.json((userLookUp || []).filter((u) => u.id !== +userId))
}
