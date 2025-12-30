"use client";

import { useState } from "react";
import PostCard from "components/postCard";
import type { Post } from "app/lib/posts";
import styles from "./search.module.css";

export default function SearchablePosts({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const searchContent = `${post.title} ${post.description} ${post.tags?.join(" ")}`.toLowerCase();
    return searchContent.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="搜索文章标题或标签... 🐾"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#999", padding: "40px" }}>
            <p style={{ fontSize: "1.2rem" }}>找不到相关的文章喵~ (ฅ'ω'ฅ)</p>
          </div>
        )}
      </div>
    </>
  );
}