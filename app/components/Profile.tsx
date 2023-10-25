import Image from "next/image"

type Props = {}

export default function Profile({}: Props) {
    return (
        <section className="w-full mx-auto">
            <Image
                className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
                alt="Profile"
                src="/images/pp.jpg"
                width={150}
                height={150}
                priority
            />
        </section>
    )
}