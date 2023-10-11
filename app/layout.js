import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Powered Trivial',
  description: 'Sample game app to test the IA knowledge',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='bg-gradient-to-b from-slate-900 to-slate-700'>
          {children}
        </main>
      </body>
    </html>
  )
}
