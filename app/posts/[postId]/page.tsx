import { getPostData, getSortedPostsData } from '@/lib/posts'
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import getFormattedDate from '@/lib/getFormattedDate'
import Link from 'next/link'

type Post = {
    postId: string
}

type Props = {
    params: Post
}

export function generateStaticParams() {
    const posts = getSortedPostsData(); //deduped, so don't worry

    return posts.map(post => ({
        postId: post.id
    }))
}

export function generateMetadata({params}: Props): Metadata {
    const posts = getSortedPostsData(); //deduped, so don't worry

    const {postId} = params;

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return {
            title: "404 Not Found",
            description: "Couldn't find post"
        }
    }

    return {
        title: post.title,
        description: "Blog post written on: " + post.date
    }
}

export default async function Post({params}: Props) {
    const posts = getSortedPostsData(); //deduped, so don't worry

    const {postId} = params;

    if (!posts.find(post => post.id === postId)) notFound(); //returns not found page if the post id is not valid

    const {title, date, contentHTML} = await getPostData(postId);

    const pubDate = getFormattedDate(date);

    return (
        <main className='px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>
            <h1 className='text-3xl mt-4 mb-0'>{title}</h1>
            <p className='mt-0'>
                {pubDate}
            </p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHTML}}/>
                <p>
                    <Link href={"/"}>⬅ Back to home</Link>
                </p>
            </article>
        </main>
    )
}
