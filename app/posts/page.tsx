import PostCard from "components/postCard";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export default function PostsListPage() {
    const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    return (
        <div className="mx-auto max-w-xl py-8">
            <h1 className="mb-8 text-center text-2xl font-black">NyaaByte's Posts</h1>
            {posts.map((post, idx) => (
                <PostCard key={idx} post={post} />
            ))}
        </div>
    )
}