import { memo } from "react";
import CommentCard from "./CommentCard";

const RenderCommentList = ({ comments }) => {
  return (
    <>
      {comments[undefined]?.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          {comments[undefined].map((comment) => {
            return (
              <CommentCard
                key={comment._id}
                comment={comment}
                childComments={comments[comment._id]}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default memo(RenderCommentList);
