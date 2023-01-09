import React from "react";
import LottieWrapper from "./LottieWrapper";
import * as jsonIcon from "./JsonIcon/loading.json";

const LottieLoadingIcon = ({ className }) => {
  return <LottieWrapper jsonIcon={jsonIcon} className={className} />;
};

export default LottieLoadingIcon;
