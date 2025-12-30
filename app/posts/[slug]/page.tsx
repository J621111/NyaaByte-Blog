import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from 'components/mdxComponents';
import styles from './post.module.css'; 

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) notFound();
  
  const date = format(new Date(post.date), 'MMMM dd, yyyy');

  return (
    <article className={styles.articleContainer}>
      <header className={styles.header}>
        <time className={styles.date}>{date}</time>
        <h1 className={styles.title}>{post.title}</h1>
      </header>
      
      <div className={styles.content}>
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.5rem' }}>
        ( ฅ^•ﻌ•^ฅ )
      </div>
    </article>
  );
}