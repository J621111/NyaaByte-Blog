import Link from 'next/link';

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
        <nav className="fixed w-full bg-gray-800 p-4 top-0 left-0 right-0 z-50 flex items-center gap-8 h-16">
            {NavigationItem.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg text-white hover:text-gray-300"
                >
                    {item.text}
                </Link>
            ))}
        </nav>
    )
}