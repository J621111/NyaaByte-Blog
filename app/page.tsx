"use client";
import { useState } from "react";
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
                <MasonryContainer />
            </>
            }
        </>
    )
}