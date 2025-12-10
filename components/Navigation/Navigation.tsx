import Link from 'next/link';
import styles from './Navigation.module.css';

type NavigationItemType = {
    href: string;
    text: string;
}
const NavigationItem: NavigationItemType[] = [
    { href: '/', text: 'NyaaByte' },
    { href: '/about', text: 'About' },
    { href: '/posts', text: 'Posts' },
] 

export default function Navigation () {
    return (
        <nav className={styles.navigation}>
            {NavigationItem.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={styles.navigationItem}
                >
                    {item.text}
                </Link>
            ))}
        </nav>
    )
}