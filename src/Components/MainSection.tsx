import React from "react";
import CreatePost from "./CreatePost";
import FeedList from "./FeedList";

export default function MainSection() {
  return (
    <>
      <section className="create-post-section">
        <CreatePost />
      </section>
      <section className="feed">
        <FeedList />
      </section>
    </>
  );
}
