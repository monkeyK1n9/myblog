import { getSortedPostsData } from '@/lib/posts'
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Post = {
    postId: string
}

type Props = {
    params: Post
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

    return (
        <div>page</div>
    )
}
