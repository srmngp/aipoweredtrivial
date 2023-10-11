'use client'

import Image from 'next/image'
import Header from './Header'
import Link from 'next/link'

const categories = ['Geography', 'History', 'Art', 'Science', 'Sports', 'Entertainment']

export default function Home() {

  const selectCategory = (index) => () => {
    console.log('index', index)
    // navigate to trivia page

  }

  return (
    <main className="flex min-h-screen flex-col items-center p-12">

      <Header />

      <div className="flex flex-col items-center justify-center gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            className='border-solid border-2 border-white p-2 rounded-md hover:animate-pulse'
            href={`/${category}`}>
            <p className='text-lg'>{category}</p>
          </Link>
        ))}
      </div>

    </main>
  )
}
