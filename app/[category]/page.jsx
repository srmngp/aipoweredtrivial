'use client'

import { useCallback, useEffect, useState } from "react"
import { useCompletion } from 'ai/react'
import Loader from "./Loader"

export default function Page({ params }) {

    const [questions, setQuestions] = useState([])

    const { complete, isLoading } = useCompletion({
        api: `/api/questions`,
    })

    const checkAndPublish = useCallback(
        async (c) => {
            const completion = await complete(c)
            if (!completion) return
            console.log(completion);
            setQuestions(JSON.parse(completion))
        },
        [complete]
    )

    return (
        <section className="flex min-h-screen flex-col items-center p-12 ">

            <p className="text-3xl font-semibold text-center">
                Questions related to: {params.category}
            </p>

            <button onClick={() => checkAndPublish(params.category)}>Generate questions</button>

            {isLoading && <Loader />}

            <div>
                {questions.map((question, index) => (

                    <div key={index} class="bg-blue w-full p-8 flex justify-center font-sans">
                        <div class="rounded bg-gray-600 w-64 p-2">
                            <div class="flex justify-between py-1">
                                <h3 class="text-sm w-5/6">{question.title}</h3>
                                <div class="text-sm">{index}/{questions.length}</div>
                            </div>
                            {question.options.map((option, index) => (
                                <div key={index} class="text-sm mt-2 text-black">
                                    <div class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-gray-300">
                                        {option}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                ))}


            </div>

        </section>
    )

}