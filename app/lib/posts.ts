import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export type Post = {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
    image?: string;
    tags?: string[];
};

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ''),
      content,
      ...(data as Omit<Post, 'slug' | 'content'>),
    };
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug);
}