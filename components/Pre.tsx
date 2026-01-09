'use client';
import { useState } from 'react';
import styles from './Pre.module.css';

export function Pre({ children, ...props }: React.ComponentProps<'pre'>) {
    const [copied, setcopied] = useState(false);
    const handleCopy = () => {
        // 尝试从 children 中提取纯文本内容
        const text = (children as any)?.props?.children || '';
        navigator.clipboard.writeText(text);
        setcopied(true);
        setTimeout(() => setcopied(false), 2000);
    }

    return (
        <div className={styles.preWrapper}>
            <pre {...props} className={styles.codeBlock}>{children}</pre>
            <button 
                className={styles.copyButton} 
                onClick={handleCopy}
            >
                {copied ? '✨ Copied!' : 'Copy'}
            </button>
        </div>
    )
}