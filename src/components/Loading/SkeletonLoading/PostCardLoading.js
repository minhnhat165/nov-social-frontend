import React from "react";

const PostCardLoading = ({ className }) => {
  return (
    <div
      className={`flex w-full flex-col rounded-xl dark:bg-dark-regular ${className}`}
    >
      <div className="flex min-h-[240px]  animate-pulse flex-col">
        <div className="flex items-center gap-2 p-3">
          <div className="h-10 w-10 rounded-full bg-dark-light"></div>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-28 rounded-xl dark:bg-dark-light"></div>
            <div className="h-3 w-10 rounded-xl dark:bg-dark-light"></div>
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="relative p-3">
          <div className="flex gap-2">
            <div className="h-3 w-10 rounded-xl dark:bg-dark-light"></div>
            <div className="h-3 w-10 rounded-xl dark:bg-dark-light"></div>
            <div className="h-3 w-10 rounded-xl dark:bg-dark-light"></div>
          </div>
          <div className="absolute top-0 right-4 mt-auto flex -translate-y-1/2 gap-2">
            <div className="circle button"></div>
            <div className="circle button"></div>
            <div className="circle button"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardLoading;
