import React from "react";
import useStore from "../store";

export default function CreatePost() {
  const activeUser = useStore((state) => state.activeUser);
  const postNewPost = useStore((state) => state.postNewPost);

  const handleNewPostSubmit = (e: any) => {
    e.preventDefault();
    if (!activeUser)
      return alert("Please select user before make a new post~~~");
    let newPost = {
      title: e.target.title.value,
      content: e.target.content.value,
      image: {
        src: e.target.image.value,
        alt: e.target.title.value,
      },
      likes: 0,
      userId: activeUser.id,
      comments: [],
    };

    postNewPost(newPost);
    e.target.reset();
  };
  return (
    <>
      <form
        id="create-post-form"
        autoComplete="off"
        onSubmit={handleNewPostSubmit}
      >
        <h2>Create a post</h2>
        <label htmlFor="image">Image</label>
        <input id="image" name="image" type="text" />
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={2}
          maxLength={30}
        ></textarea>
        <div className="action-btns">
          <button id="preview-btn" type="button">
            Preview
          </button>
          <button type="submit">Post</button>
        </div>
      </form>
      {/* <!-- FOR THE CHALLENGE START --> */}
      <div className="post">
        {/* <!-- Go to post.html and scroll down to the preveiw cards --> */}
      </div>
      {/* <!-- FOR THE CHALLENGE END --> */}
    </>
  );
}
