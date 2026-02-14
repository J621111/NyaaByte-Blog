import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { Suspense } from 'react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from 'components/mdxComponents';
import { getTableOfContents } from '../../lib/posts';
import TOC from 'components/TOC/TOC';
import rehypeSlug from 'rehype-slug';
import styles from './post.module.css';
import WalineComment from 'components/comment';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) notFound();

  const headings = getTableOfContents(post.content);
  
  const date = format(new Date(post.date), 'MMMM dd, yyyy');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px', margin: '0 auto' }}>

      <div style={{ flex: 1, maxWidth: '700px', margin: '0 20px' }}>
      <article className={styles.articleContainer} style={{ flex: 1, margin: '40px 0' }}>
        <header className={styles.header}>
          <time className={styles.date}>{format(new Date(post.date), 'MMMM dd, yyyy')}</time>
          <h1 className={styles.title}>{post.title}</h1>
        </header>
        
        <div className={styles.content}>
          <MDXRemote 
            source={post.content} 
            components={{...MDXComponents, Suspense}} 
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeSlug],
              }
            }}
          />
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.5rem' }}>
          ( ฅ^•ﻌ•^ฅ )
        </div>
      </article>

      <div className={styles.commentWrapper}>
        <WalineComment />
      </div>
    </div>
    
      {/* 侧边目录 */}
      <TOC headings={headings} />
    </div>
  );
}
