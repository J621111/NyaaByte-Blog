import React from "react";
import Image from "next/image";
import styles from "./MasonryCard.module.css";

export interface MasonryCardProps {
    id?: string | number;
    content: string;
    image: string;
    title?: string;
    variant?: "default" | "wide" | "tall";
}

export default function MasonryCard({ title, image, content, variant = "default" }: MasonryCardProps) {
    const getVariantClass = () => {
        switch (variant) {
            case "default":
                return "";
            case "wide":
                return styles["span-2-col"];
            case "tall":
                return styles["span-2-row"];
        }
    };


    return (
        <div className={`${styles["masonry-card"]} ${getVariantClass()}`}>
            <div style={{marginBottom: "1rem"}}>
            <Image
                src={image}
                alt="图片"
                height={40}
                width={40}
                style={{objectFit: "contain"}}
            />
            </div>
            <h3 className={styles["title"]}>{title}</h3>
            <p className={styles["content"]}>{content}</p>
        </div>
    )
}