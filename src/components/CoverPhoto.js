import React from "react";
import Img from "./Img";

const CoverPhoto = ({ img }) => {
  return (
    <div>
      <Img src={img} className="w-full object-cover" />
    </div>
  );
};

export default CoverPhoto;
