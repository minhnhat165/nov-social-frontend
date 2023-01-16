import React from "react";

const TitleLine = ({ children }) => {
  return (
    <div className="relative flex w-full items-center justify-center rounded-xl ">
      <div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-primary/50"></div>
      <span className="button circle relative  border border-primary/50 bg-dark-very-light p-2 px-2 text-center text-xl dark:text-dark-text-regular">
        {children}
      </span>
    </div>
  );
};

export default TitleLine;
