"use client";
import { useState, useEffect } from 'react';

const DISPLAY_DURATION_SECONDS = 5;

interface WelcomeImageProps {
    onFinish: () => void;
}

const WelcomeImage = ({ onFinish}: WelcomeImageProps) => {
    // 默认可见
    const [isVisible, setIsVisible] = useState(true);

    // 定时器
    useEffect (() => {
        const timeDuration = DISPLAY_DURATION_SECONDS * 1000;

        const timer = setTimeout(() => {
            setIsVisible(false);
            onFinish();
            console.log(`图片已在 ${DISPLAY_DURATION_SECONDS} 秒后隐藏了喵`);
        }, timeDuration);

        // 清除定时器
        return () => clearTimeout(timer);
    }, [onFinish]);

    if (isVisible) {
        return (
            <div className="fixed w-screen h-screen z-50 inset-0">
                <img
                    src="https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/136046620_p0_master1200.jpg"
                    alt="Welcome to NyaaByte little world!"
                    className="w-full h-full object-cover"
                />
            </div>
        )
    }
    return null;
};

export default WelcomeImage;