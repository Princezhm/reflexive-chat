import { Message, PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { env } from 'process'
import { Configuration, OpenAIApi } from 'openai'
import { jokes } from 'src/utils/jokes'

const configuration = new Configuration({
    organization: env.OPEN_AI_ORG,
    apiKey: env.OPEN_AI_KEY,
})
const openai = new OpenAIApi(configuration)

interface NewMessage {
    chatId: number
    message: string
    sentBy: number
    dummyAI: boolean
}
const prisma = new PrismaClient()

export async function POST(request: Request) {
    const req: NewMessage = await request.json()
    const { chatId, message, sentBy, dummyAI = true } = req

    const newMessage = await prisma.message.create({
        data: {
            message,
            createdAt: new Date(),
            chatId,
            sentBy,
        },
    })

    handleAIBehaviour(newMessage, dummyAI)

    return NextResponse.json(newMessage)
}

const handleAIBehaviour = async (message: Message, dummyAI: boolean) => {
    const { chatId } = message

    const chat = await prisma.chat.findFirst({
        where: {
            id: chatId,
            toId: 1,
        },
    })

    if (chat) {
        // this means it is the AI
        if (dummyAI) {
            // do dummy stuff
            const response = dummyBot(message.message)

            saveAIResponse(response, chatId)
        } else {
            // call OPEN AI
            const response = await callOpenAI(message.message)

            if (response) {
                saveAIResponse(response, chatId)
            }
        }
    }
}

const dummyBot = (message = ''): string => {
    const [i, ...rest] = message.split('')
    switch (i) {
        case '1':
            return `${Math.floor(Math.random() * 1001)}`
        case '2':
            return `${rest.filter((c) => !!c.trim()).length}`
        case '3':
            const index = Math.floor(Math.random() * jokes.length)
            return jokes[index] || ''
        default: {
            return `
            Hello my name is Dummy Bot, I'm not so smart like ChatGPT-3 buuuuutt.... I promise I'll do my best, I can do 3 things:
            1. give you a random number between 0 and 1000(very impresive)
            2. count letters of a string (usage is 2 XXXXXXXXX)
            3. tell a joke

            please select and option and I'll take care of the rest.
            `
        }
    }
}

const callOpenAI = async (text: string) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: text,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            n: 1,
        })

        const { data } = response
        const [res] = data.choices

        if (res && res.text) {
            return res.text.trim()
        }
    } catch (e) {
        console.log('we had an error', e)
        return ''
    }

    return ''
}

const saveAIResponse = async (message: string, chatId: number) => {
    await prisma.message.create({
        data: {
            message,
            createdAt: new Date(),
            chatId,
            sentBy: 1,
        },
    })
}
