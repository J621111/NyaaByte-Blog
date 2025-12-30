import React from'react';
import MasonryCard from'./MasonryCard';
import { MasonryCardProps } from'./MasonryCard';

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
}

interface MasonryContainerProps {
    items: MasonryCardProps[];
}

export default function MasonryContainer({ items }: MasonryContainerProps) {
    return (
        <div style={containerStyle}>
            {items==null? null : items.map(item => (
                <MasonryCard 
                    key={item.id}
                    title={item.title}
                    variant={item.variant}
                    image={item.image}
                    content={item.content}
                />
            ))}
        </div>
    )
}