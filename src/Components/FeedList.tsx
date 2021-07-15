import React, { useEffect } from "react";
import useStore from "../store";
import Post from "./Post";

export default function FeedList() {
  const getPostList = useStore((state) => state.getPostList);
  const postList = useStore((state) => state.postList);
  useEffect(() => {
    getPostList();
  }, []);

  if (!postList) return null;
  return (
    <>
      <ul className="stack">
        {postList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
}
