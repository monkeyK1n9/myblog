import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
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
        <Profile />
        {children}
      </body>
    </html>
  )
}
