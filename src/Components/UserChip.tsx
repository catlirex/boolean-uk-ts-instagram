import React from "react";
import useStore, { UserType } from "../store";

type UserChipProps = {
  user: UserType;
};

export default function UserChip({ user }: UserChipProps) {
  const activeUser = useStore((state) => state.activeUser);
  const setActiveUser = useStore((state) => state.setActiveUser);

  return (
    <div
      className={`chip ${activeUser?.id === user.id ? "active" : null}`}
      onClick={() => setActiveUser(user)}
    >
      <div className="avatar-small">
        <img src={user.avatar} alt={user.username} />
      </div>
      <span>{user.username}</span>
    </div>
  );
}
