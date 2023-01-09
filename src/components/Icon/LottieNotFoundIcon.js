import React from "react";
import LottieWrapper from "./LottieWrapper";
import * as jsonIcon from "./JsonIcon/notfound.json";

const LottieNotFoundIcon = ({ className }) => {
  return <LottieWrapper jsonIcon={jsonIcon} className={className} />;
};

export default LottieNotFoundIcon;
