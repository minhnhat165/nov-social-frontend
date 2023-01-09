import React, { memo } from "react";
import CommentCard from "./CommentCard";

const RenderReply = ({ replies, onReply }) => {
  return (
    <div className="relative mt-2 mb-2">
      {replies?.map((comment) => (
        <div className="relative mb-2" key={comment._id}>
          <CommentCard comment={comment} onReply={() => onReply(comment)} />
          <div className="absolute top-0 -left-[0.5px] h-4 w-8 -translate-x-full rounded-bl-xl border-b-2 border-l-2 dark:border-dark-very-light"></div>
        </div>
      ))}
    </div>
  );
};

export default memo(RenderReply);
