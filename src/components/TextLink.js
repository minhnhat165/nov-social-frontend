import React from "react";
import { Link } from "react-router-dom";

const TextLink = ({ text, link }) => {
  return (
    <Link to={link} className="hover:text-primary">
      {text}
    </Link>
  );
};
export default TextLink;
