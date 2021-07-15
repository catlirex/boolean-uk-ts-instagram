import React from "react";
import useStore, { PostType } from "../store";
import CommentCard from "./CommentCard";

type PostProps = {
  post: PostType;
};
export default function Post({ post }: PostProps) {
  const { id, title, content, image, likes, userId, comments } = post;
  const userList = useStore((state) => state.userList);
  let userDetail = userList.find((target) => target.id === userId);
  const activeUser = useStore((state) => state.activeUser);
  const postNewComment = useStore((state) => state.postNewComment);
  const addLike = useStore((state) => state.addLike);

  const handleCommentFormSubmit = (e: any) => {
    e.preventDefault();
    if (!activeUser)
      return alert("Please select user before post new comment!!");

    let newComment = {
      content: e.target.comment.value,
      userId: activeUser.id,
      postId: post.id,
    };

    postNewComment(newComment);
    e.target.reset();
  };

  return (
    <li className="post">
      <div className="chip">
        <div className="avatar-small">
          <img src={userDetail?.avatar} alt={userDetail?.username} />
        </div>
        <span>{userDetail?.username}</span>
      </div>
      <div className="post--image">
        <img src={image.src} alt={image.alt} />
      </div>
      <div className="post--content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <div className="post--like">
        <span>{likes} likes</span>
        <div className="heart" onClick={() => addLike(id, likes + 1)}>
          ♡
        </div>
      </div>
      <div className="post--comments">
        <h3>Comments</h3>
        {comments
          ? comments.map((comment) => (
              <CommentCard
                key={comment.userId + comment.content}
                comment={comment}
              />
            ))
          : null}

        <form
          id="create-comment-form"
          autoComplete="off"
          onSubmit={handleCommentFormSubmit}
        >
          <label htmlFor="comment">Add comment</label>
          <input id="comment" name="comment" type="text" />
          <button type="submit">Comment</button>
        </form>
      </div>
    </li>
  );
}
