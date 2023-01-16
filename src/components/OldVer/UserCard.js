import React, { useState } from "react";
import Avatar from "./Avatar";
import TextLink from "./TextLink";

const UserCard = ({
  user,
  subName,
  RightComponent,
  hover = false,
  onClick = () => {},
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={`relative flex items-center justify-between rounded-xl p-2 ${
        hover ? "cursor-pointer hover:bg-primary/20" : ""
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex items-center gap-2">
        <Avatar url={user.avatar} />
        <div>
          <span className="font-bold leading-4 dark:text-dark-text-bold">
            <TextLink text={user.name} link={`/profile/${user._id}`} />
          </span>
          <span>{subName}</span>
        </div>
      </div>
      {RightComponent && <RightComponent />}
      {isHover && hover && (
        <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer rounded-xl dark:bg-dark-very-light/20"></div>
      )}
    </div>
  );
};

export default UserCard;
