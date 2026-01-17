import styles from './footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mottoSection}>
        <span className="rainbow-text" style={{ fontSize: '1.8rem' }}>
          "Ciallo~ Welcome to my blog!"
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
        <a href="https://github.com/J621111" target="_blank" className={styles.linkItem} title="GitHub">
          <Image src="https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/github.svg" width={50} height={50} alt="GitHub" />
        </a>
      </div>

      <p className={styles.copyRight}>
        © {new Date().getFullYear()} NyaaByte • Built with Love & Magic ✨
      </p>
    </footer>
  );
}