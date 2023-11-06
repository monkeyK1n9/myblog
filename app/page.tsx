import Image from 'next/image'
import Posts from './components/Posts'
import Profile from './components/Profile'

export default function Home() {
  return (
    <div className="mx-auto">
      <Profile />
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and welcome 🖐
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">King</span>
        </span>
      </p>

      <Posts />
    </div>
  )
}
