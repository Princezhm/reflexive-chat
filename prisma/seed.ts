import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    let openAI = await prisma.user.findFirst({
        where: {
            user: 'AI',
        },
    })

    if (!openAI) {
        openAI = await prisma.user.create({
            data: {
                user: 'AI',
                password: '', // shouldn't be able to open this.
                createdAt: new Date(),
            },
        })
        const prince = await prisma.user.create({
            data: {
                user: 'Prince',
                password: 'Prince',
                createdAt: new Date(),
            },
        })

        const johnDoe = await prisma.user.create({
            data: {
                user: 'JohnDoe',
                password: 'johndoe',
                createdAt: new Date(),
            },
        })

        console.log('Create base users for IA Chat and user chatting')
        console.log(openAI)
        console.log(prince)
        console.log(johnDoe)
    } else {
        console.log('First users already created!')
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
