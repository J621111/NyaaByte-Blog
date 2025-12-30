import { getAllPosts } from "../lib/posts";
import { compareDesc } from "date-fns";
import SearchablePosts from "components/searchPost/SearchPost";

const titleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    lineHeight: "1.2",
    margin: "0 0 1.5rem 0",
    color: "#ffb7c5",
    fontStyle: "italic",
    textAlign: "center" as const
}

export default function PostsListPage() {
  // 在服务端获取数据
  const allPosts = getAllPosts().sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="mx-auto max-w-xl py-8 px-4">
      <h1 style={titleStyle}>NyaaByte's Posts</h1>
      
      <SearchablePosts posts={allPosts} />
    </div>
  );
}