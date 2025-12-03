import { makeSource, defineDocumentType } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const Post = defineDocumentType (() => ({
    // 定义文档类型
    name: 'Post',
    filePathPattern: `posts/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type:'string', required: true },
        date: { type: 'date', required: true },
        description: { type:'string', required: true },
        tags: { type: 'list', of: { type:'string' } },
        image: { type: 'string' }
    },
    computedFields: {
        // 自动生成 slug 和 url
        slug: {
            type:'string',
            resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
        },
        url: {
            type:'string',
            resolve: (doc) => `/posts/${doc._raw.sourceFileName.replace(/\.mdx$/, '')}`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            // 让标题（如 <h2>）自动链接到自身，方便分享
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
    },
})