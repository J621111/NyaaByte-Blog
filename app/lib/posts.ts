import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

// GitHub API Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'J621111';
const GITHUB_REPO = process.env.GITHUB_REPO || 'NyaaByte-Blog';
const GITHUB_CONTENT_PATH = process.env.GITHUB_CONTENT_PATH || 'content';

// Check if we should use GitHub API
const useGitHubAPI = process.env.NODE_ENV === 'production' && GITHUB_TOKEN;

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

// Fetch posts from GitHub API
async function getPostsFromGitHub(): Promise<Post[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_CONTENT_PATH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const files = await response.json();
    
    if (!Array.isArray(files)) {
      return [];
    }

    const mdxFiles = files.filter((file: any) => file.name.endsWith('.mdx'));
    
    const posts = await Promise.all(
      mdxFiles.map(async (file: any) => {
        try {
          const contentResponse = await fetch(file.download_url, {
            next: { revalidate: 60 },
          });
          
          if (!contentResponse.ok) {
            return null;
          }

          const content = await contentResponse.text();
          const { data, content: body } = matter(content);
          
          return {
            slug: file.name.replace(/\.mdx$/, ''),
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            description: data.description || '',
            content: body,
            image: data.image,
            tags: data.tags || [],
          };
        } catch (error) {
          console.error(`Error fetching post ${file.name}:`, error);
          return null;
        }
      })
    );

    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching posts from GitHub:', error);
    return [];
  }
}

// Fetch single post from GitHub API
async function getPostFromGitHub(slug: string): Promise<Post | undefined> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_CONTENT_PATH}/${slug}.mdx`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return undefined;
    }

    const file = await response.json();
    
    if (!file.download_url) {
      return undefined;
    }

    const contentResponse = await fetch(file.download_url, {
      next: { revalidate: 60 },
    });
    
    if (!contentResponse.ok) {
      return undefined;
    }

    const content = await contentResponse.text();
    const { data, content: body } = matter(content);
    
    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      content: body,
      image: data.image,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error fetching post ${slug} from GitHub:`, error);
    return undefined;
  }
}

// Get posts from local filesystem
function getPostsFromLocal(): Post[] {
  try {
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
  } catch (error) {
    console.error('Error reading local posts:', error);
    return [];
  }
}

// Get single post from local filesystem
function getPostFromLocal(slug: string): Post | undefined {
  try {
    const raw = fs.readFileSync(path.join(postsDirectory, `${slug}.mdx`), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug,
      content,
      ...(data as Omit<Post, 'slug' | 'content'>),
    };
  } catch (error) {
    return undefined;
  }
}

// Main functions
export async function getAllPosts(): Promise<Post[]> {
  if (useGitHubAPI) {
    return getPostsFromGitHub();
  }
  return getPostsFromLocal();
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  if (useGitHubAPI) {
    return getPostFromGitHub(slug);
  }
  return getPostFromLocal(slug);
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
