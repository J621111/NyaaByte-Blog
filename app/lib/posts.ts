import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '');
}

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

export function getTableOfContents(content: string) {
  // 匹配 # 或 ## 开头的行
  const headingLines = content.split('\n').filter((line) => line.match(/^#{1,2}\s/));

  return headingLines.map((line) => {
    const level = line.split(' ')[0].length; // 1 或 2
    const text = line.replace(/^#{1,2}\s/, '').trim();
    return {
      id: slugify(text),
      text,
      level,
    };
  });
}