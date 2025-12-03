import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';

interface PostCardProps {
    post: Post
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="mb-8">
            <h2 className="mb-1 text-xl">
                <Link href={post.url} className="text-blue-500 hover:text-blue-900 dark:text-blue-400">
                    {post.title}
                </Link>
            </h2>
                <time dateTime={post.date} className="block text-sm text-gray-500">
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
                <div className="text-sm text-gray-600">
                    {post.description}
                </div>
        </div>
    )
}