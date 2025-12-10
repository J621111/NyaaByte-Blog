import React from'react';
import MasonryCard from'./MasonryCard';
import { MasonryCardProps } from'./MasonryCard';
import Image from 'next/image';

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
}

const MockData: MasonryCardProps[] = [
    {
        id : 1,
        title: 'html',
        variant: 'wide',
        image: 'https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/html5.svg',
        content: 'HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages and web applications.'
    },
    {
        id : 2,
        title: 'css', 
        variant: 'default',
        image: 'https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/css.svg',
        content: 'CSS stands for Cascading Style Sheets. It is used to style the HTML elements on a web page.'
    },
    {
        id : 3,
        title: 'javascript',
        variant: 'tall',
        image: 'https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/javascript.svg',
        content: 'JavaScript is a high-level, dynamic, interpreted, and multi-paradigm programming language. It is used for creating interactive web applications, including front-end development.'
    }
]

export default function MasonryContainer() {
    return (
        <div style={containerStyle}>
            {MockData.map(item => (
                <MasonryCard 
                    title={item.title}
                    variant={item.variant}
                    image={item.image}
                    content={item.content}
                />
            ))}
        </div>
    )
}