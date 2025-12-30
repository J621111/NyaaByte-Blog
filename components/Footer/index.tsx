import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mottoSection}>
        <span className="rainbow-text" style={{ fontSize: '1.8rem' }}>
          "Ciallo~ 方糖，是甜的。"
        </span>
      </div>

      <div className={styles.counterSection}>
        <img 
          src="https://count.getloli.com/get/@NyaaByte-blog?theme=gelbooru" 
          alt="Visitor Count" 
          title="Total Visitors"
        />
      </div>

      <div className={styles.socialLinks}>
        <a href="https://github.com/J621111" target="_blank" className={styles.linkItem} title="GitHub">🐱</a>
        <a href="https://twitter.com/NyaaByte" target="_blank" className={styles.linkItem} title="Twitter">🐦</a>
        <a href="mailto:hello@nyaabyte.com" className={styles.linkItem} title="Email">💌</a>
        <a href="/rss.xml" className={styles.linkItem} title="RSS">📡</a>
      </div>

      <p className={styles.copyRight}>
        © {new Date().getFullYear()} NyaaByte • Built with Love & Magic ✨
      </p>
    </footer>
  );
}