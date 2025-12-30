import Link from 'next/link';
import { format } from 'date-fns';
import type { Post } from 'app/lib/posts';
import styles from './postCard.module.css'; // 引入样式

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.date);
  const iso = date.toISOString();

  return (
    <div className={styles.card}>
      <h2 className="mb-1">
        <Link href={`/posts/${post.slug}`} className={styles.titleLink}>
          {post.title}
        </Link>
      </h2>
      <time dateTime={iso} className={styles.date}>
        {format(date, 'LLLL d, yyyy')}
      </time>
      <div className={styles.description}>
        {post.description}
      </div>
    </div>
  );
}