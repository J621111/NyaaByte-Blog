"use client";
import { useState } from "react";
import WelcomeImage from "components/WelcomeImage";
import Navigation from "components/Navigation";
import TypingEffect from "components/TypingEffect";

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
                <div className="mt-16">
                <img
                    src="https://cdn.jsdelivr.net/gh/J621111/Image-Hosting/img/104453964_p0_master1200.jpg"
                    alt="Welcome to NyaaByte little world!"
                    className="w-full h-auto"
                />
                <TypingEffect
                    strings={welcomText}
                    typeSpeed={100}
                    loop={true}// 循环播放
                    backSpeed={50}
                />
                </div>
            </>
            }
        </>
    )
}