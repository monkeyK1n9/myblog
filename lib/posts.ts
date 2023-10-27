import fs from 'fs';
import path from 'path';
import matter from "gray-matter";
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'blogposts');

export function getSortedPostsData() {
    //get file names under the /posts directory
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        //remove ".md" file extention from the file name to get the unique id
        const id = fileName.replace(/\.md$/, '');

        //react markdown text file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        //use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
        }

        //combien the data with the id and returning it
        return blogPost;
    })

    //sor the posts by date and return it
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    //use gray-matter to parse the file metadata section
    const matterResult = matter(fileContents);

    const processContent = await remark()
        .use(html)
        .process(matterResult.content);

    // we now present the result as html file to be sent to the client
    const contentHTML = processContent.toString();

    const blogpostWithHTML: BlogPost & {contentHTML: string} = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHTML
    }

    //return result with id included
    return blogpostWithHTML;
}