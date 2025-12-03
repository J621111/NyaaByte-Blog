"use client";
import Typed from "typed.js";
import { useEffect, useRef} from "react";

// 定义TypingEffectProps接口
interface TypingEffectProps {
    strings: string[];
    typeSpeed: number;
    loop: boolean;
    backSpeed: number;
}

// 定义TypingEffect组件
const TypingEffect = ({
    strings,
    typeSpeed,
    loop,
    backSpeed,
}: TypingEffectProps) => {
    // 指向一个元素
    const el = useRef<HTMLSpanElement>(null);
    // 保存Typed实例
    const typedInstance = useRef<Typed | null>(null);

    useEffect(() => {
        // 确保el.current不为空
        if (el.current) {
            const options = {
                strings,
                typeSpeed,
                loop,
                backSpeed,
                // 其他配置选项
                showCursor: true,
                cursorChar: '|',
            };
            // 创建Typed实例
            typedInstance.current = new Typed(el.current, options);
        }

        // 返回一个清理函数
        return () => {
            if (typedInstance.current) {
                typedInstance.current.destroy();
            }
        };
    }, [strings, typeSpeed, loop, backSpeed]);
    // 渲染包含ref的元素
    return (
        <div className="font-extrabold
        text-lg
        italic
        text-center 
        rainbow-text"
        >
            <span ref={el} />
        </div>
    );
}

export default TypingEffect;

