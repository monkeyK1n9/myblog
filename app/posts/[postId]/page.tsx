import { getPostByName, getPostsMeta } from '@/lib/posts'
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import getFormattedDate from '@/lib/getFormattedDate'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'


type Props = {
    params: {
        postId: string
    }
}

export const revalidate = 10;

export async function generateStaticParams() {
    const posts = await getPostsMeta(); //deduped, so don't worry

    if (!posts) return []; //we return empty array to solve the empty params if posts is undefined

    return posts.map(post => ({
        postId: post.id
    }))
}

export async function generateMetadata({params: { postId }}: Props) {
    const post = await getPostByName(`${postId}.mdx`);

    if (!post) {
        return {
            title: "404 Not Found",
            description: "Couldn't find post"
        }
    }

    return {
        title: post.meta.title,
        description: "Blog post written on: " + post.meta.date
    }
}

export default async function Post({params: { postId }}: Props) {
    const post = await getPostByName(`${postId}.mdx`); //deduped, so don't worry
    
    if (!post) notFound(); //returns not found page if the post id is not valid

    const {meta, content} = post

    const pubDate = getFormattedDate(meta.date);

    const tags = meta.tags?.map((tag, index) => (
        <Link key={index} href={`/tags/${tag}`}>{tag}</Link>
    ))

    return (
        <>
            <h2 className='text-3xl mt-4 mx-0'>{meta.title}</h2>
            <p className='mt-0 text-sm'>
                {pubDate}
            </p>
            <article>
                {content}
            </article>
            <section>
                <h3>
                    Related:
                </h3>
                <div className='flex flex-row gap-4'>
                    {tags}
                </div>
            </section>
            <p className='mb-10'>
                <Link href="/">⬅ Back to home</Link>
            </p>
        </>
    )
}
