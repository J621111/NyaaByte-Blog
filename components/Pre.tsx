'use client';
import { useState } from 'react';

export function Pre({ children, ...props }: React.ComponentProps<'pre'>) {
    const [copied, setcopied] = useState(false);
    const handleCopy = () => {
        const text = ( children as any )?.props?.children || '';
        navigator.clipboard.writeText(text);
        setcopied(true);
        setTimeout(() => setcopied(false), 2000);
    }
    return (
        <div className="relative my-6">
            <pre {...props}>{children}</pre>
            <button 
                className="absolute top-0 right-0 mr-2 mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" 
                onClick={handleCopy}
            >
                {copied? 'Copied' : 'Copy'}
            </button>
        </div>
    )
}