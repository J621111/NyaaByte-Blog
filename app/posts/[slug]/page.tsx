import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "components/mdxComponents";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    return allPosts.map((post) => ({slug: post.slug}));
}

export const generateMetadata = ({ params }: { params: {slug: string}}) => {
    const post = allPosts.find((post) => post.slug === params.slug);
    if (!post) notFound();
    return {title: post.title}
}

const PostLayout = ({ params }: { params: {slug: string}}) => {
    const post = allPosts.find((post) => post.slug === params.slug);
    if (!post) notFound();
    
    const MDXContent = useMDXComponent(post.body.raw);
    
    return (
        <article className="mx-auto max-w-xl py-8">
            <div className="mb-8 text-center">
                <time dateTime={post.date} className="mb-1 text-xs text-gray-500">
                    {format(parseISO(post.date), "LLL dd, yyyy")}
                </time>
                <h1 className="text-3xl font-bold">{post.title}</h1>
            </div>
            <div 
                className="[&>*]:mb-3 [&>*:last-child]:mb-0" 
            >
                <MDXContent components={MDXComponents} />
            </div>
        </article>
    )
}

export default PostLayout;
