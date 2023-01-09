import React from "react";
import jsonIcon from "./JsonIcon/typing.json";
import LottieWrapper from "./LottieWrapper";

const TypingIcon = ({ className }) => {
  return <LottieWrapper jsonIcon={jsonIcon} className={className} />;
};

export default TypingIcon;
