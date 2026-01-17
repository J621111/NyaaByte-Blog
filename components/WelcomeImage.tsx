"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const DISPLAY_DURATION_SECONDS = 1;
const FADE_DURATION_MS = 1000;

const ImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1000,
    top: 0,
    left: 0,
    position: 'fixed',
    transition: `opacity ${FADE_DURATION_MS}ms ease-out`,
}

interface WelcomeImageProps {
    onFinish: () => void;
}

const WelcomeImage = ({ onFinish}: WelcomeImageProps) => {
    // 默认可见
    const [isVisible, setIsVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);

    // 定时器
    useEffect (() => {
        const timeDuration = DISPLAY_DURATION_SECONDS * 1000;
        const fadeTimer = setTimeout(() => {
            setOpacity(0);
        }, timeDuration);

        const notifyTimer = setTimeout(() => {
            onFinish();
        }, timeDuration + 200);

        const destroyTimer = setTimeout(() => {
            setIsVisible(false);
        }, timeDuration + FADE_DURATION_MS);

        // 清除定时器
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(destroyTimer);
            clearTimeout(notifyTimer);
        }
    }, [onFinish]);

    if (isVisible) {
        return (
            <div className="fixed w-screen h-screen z-50 inset-0">
                <Image
                    src="https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/136046620_p0_master1200.jpg"
                    alt="Welcome to NyaaByte little world!"
                    style={{...ImageStyle, opacity: opacity}}
                    width={1920}
                    height={1080}
                    priority={true}
                />
            </div>
        )
    }
    return null;
};

export default WelcomeImage;