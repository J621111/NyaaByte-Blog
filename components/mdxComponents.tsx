import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Pre } from './Pre';
import { JSX } from 'react';

// 表格
const Table = ({ className, ...props }: JSX.IntrinsicElements['table']) => (
    <div className="my-6 w-full overflow-auto">
        <table className={clsx('w-full text-sm', className)} {...props} />
    </div>
)

// 自定义链接，区分内外链
const CustonLink = ({ href = '', ...props }: JSX.IntrinsicElements['a']) => {
    const isInternal = href && (href.startsWith('/')) || href.startsWith('#')
    if (isInternal) {
        return <Link href={href} {...props} />
    }
    return <a target='_blank' rel='noopener noreferrer' href={href} {...props} />
}

// 图片优化
const CumstomImage = (props: JSX.IntrinsicElements['img']) => {
    return <Image
        className="rounded-lg"
        {...props as any}
        alt={props.alt || ''}
        width={800}
        height={400}
    />
}

// heading带锚点
const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const Heading = ({ children, id }: JSX.IntrinsicElements['h1']) => {
        const Tag = `h${level}` as any
        return (
            <Tag id={id} className="group scroll-mt-20">
                {children}
                <a
                    href={`#${id}`}
                    className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100"
                >
                    #
                </a>
            </Tag>
        )
    }
    return Heading
}

// 导出映射
const MDXComponents = {
    // 文本
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: (props: JSX.IntrinsicElements['p']) => <p className="my-4 text-lg" {...props} />,
    ol: (props: JSX.IntrinsicElements['ol']) => <ol className="my-4 list-decimal ml-6" {...props} />,
    ul: (props: JSX.IntrinsicElements['ul']) => <ul className="my-4 list-disc ml-6" {...props} />,
    li: (props: JSX.IntrinsicElements['li']) => <li className="my-2" {...props} />,
    blockquote: (props: JSX.IntrinsicElements['blockquote']) => (
        <blockquote
            className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600"
            {...props}
        />
    ),

    // 链接
    a: CustonLink,

    // 代码
    pre: Pre,
    code: (props: JSX.IntrinsicElements['code']) => (
        <code
            className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm"
            {...props}
        />
    ),

    // 图片
    img: CumstomImage,
    
    // 表格
    table: Table,
    th: ({ className, ...props}: any) => (
        <th
            className={clsx('border-b border-gray-300 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider', className)}
            {...props}
        />
    ),
    td: ({ className, ...props}: any) => (
        <td
            className={clsx('border-b border-gray-300 px-4 py-2 text-sm', className)}
            {...props}
        />
    )
}

export default MDXComponents;