'use client';

import styles from './TOC.module.css';

interface TOCProps {
  headings: { id: string; text: string; level: number }[];
}

export default function TOC({ headings }: TOCProps) {
  if (headings.length === 0) return null;

  return (
    <aside className={styles.tocWrapper}>
      <div className={styles.tocContainer}>
        <div className={styles.tocTitle}>🐾 目 录</div>
        <nav>
          <ul className={styles.tocList}>
            {headings.map((h) => (
              <li 
                key={h.id} 
                className={h.level === 1 ? styles.itemH1 : styles.itemH2}
              >
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}