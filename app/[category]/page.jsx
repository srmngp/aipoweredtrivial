'use client'

import { useCallback, useEffect, useState } from "react"
import { useCompletion } from 'ai/react'

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
        <section>

            <div>My categorie: {params.category}</div>

            <button onClick={() => checkAndPublish(params.category)}>Generate questions</button>

            {isLoading && (
                <p>... Loading</p>
            )}
            <div>
                {questions.map((question, index) => (
                    <div key={index} className="p-4">
                        <h3>{question.title}</h3>
                        <div className="p-4">
                            <div className="p-2">
                                <div>Answer: {question.answer}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )

}