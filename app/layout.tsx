import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Written articles from my mind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-800">
        <Navbar />
        <main className='px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>
          {children}
        </main>
      </body>
    </html>
  )
}
