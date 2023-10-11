import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST (req) {
  const { prompt } = await req.json()

  54
  const response = await openai.chat.completions.create({

    model: 'gpt-3.5-turbo',

    stream: true,

    messages: [

      {

        role: 'user',

        content: `Generate a set of trivia 5 questions about ${prompt}
            following this JSON format

            [

             {"title": "question title", "answer": "correct aswer", "options": ["opt1", "opt2", "opt3", "opt4"]}

            ]`

      }

    ],

    max_tokens: 500,

    temperature: 0.2

  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
