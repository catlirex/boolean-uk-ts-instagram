import React from "react";
import useStore from "../store";
import UserChip from "./UserChip";

export default function HeaderSection() {
  const userList = useStore((state) => state.userList);
  console.log(userList);

  return (
    <header className="main-header">
      <div className="wrapper">
        {userList.map((user) => (
          <UserChip key={user.username} user={user} />
        ))}
      </div>
    </header>
  );
}
