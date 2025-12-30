"use client";
import { useState } from "react";
import Image from "next/image";
import WelcomeImage from "components/WelcomeImage";
import Navigation from "components/Navigation/Navigation";
import TypingEffect from "components/TypingEffect";
import MasonryContainer from "components/MasonryCard/MasonryContainer";

export default function HomePage() {
    // 控制内容显示
    const [showContent, setShowContent] = useState(false);
    // 欢迎文本
    const welcomText = [
        "Welcome to NyaaByte's Blog!",
        "Love Coding, Love Life!",
    ]
    // 控制图片消失后的回调
    const handleOnFinish = () => {
        setShowContent(true);
    }
    return (
        <>
            <WelcomeImage onFinish={handleOnFinish} />
            {showContent &&
            <>
                <Navigation />
                <TypingEffect
                    strings={welcomText}
                    typeSpeed={100}
                    loop={true}// 循环播放
                    backSpeed={50}
                />
                <Image
                    src="https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-12-22%20185250.png"
                    width={100}
                    height={100}
                    layout="responsive"
                    alt="Welcome"
                />

                <MasonryContainer items={[]} />
            </>
            }
        </>
    )
}