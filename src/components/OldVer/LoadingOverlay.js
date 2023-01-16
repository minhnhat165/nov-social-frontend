import React from "react";
import LoadingIcon from "./Icon/LottieLoadingIcon";

const LoadingOverlay = ({ className }) => {
  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center rounded-xl backdrop-brightness-50 ${className}`}
    >
      <LoadingIcon className="h-32 w-32" />
    </div>
  );
};

export default LoadingOverlay;
