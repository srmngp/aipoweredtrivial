import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST (req) {
  const { category } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `Generate a set of trivia 5 questions about Geography in JSON format. Each question should have a title, answer, and an array of 4 options, as shown in the JSON example. Please provide 5 questions.
            JSON example:
            [
             {title: "What is the capital of France?", answer: "Paris", options: ["Paris", "London", "Berlin", "Madrid"]},
             {title: "What is the capital of Spain?", answer: "Madrid", options: ["Paris", "London", "Berlin", "Madrid"]},
            ]`
      }
    ],
    max_tokens: 500,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
