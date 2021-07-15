import React from "react";
import useStore, { CommentType } from "../store";

type CommentCardProps = {
  comment: CommentType;
};

export default function CommentCard({ comment }: CommentCardProps) {
  const { content, userId } = comment;
  const userList = useStore((state) => state.userList);
  let userDetail = userList.find((target) => target.id === userId);

  return (
    <div className="post--comment">
      <div className="avatar-small">
        <img src={userDetail?.avatar} alt={userDetail?.username} />
      </div>
      <p>{content}</p>
    </div>
  );
}
