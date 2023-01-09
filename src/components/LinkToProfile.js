import React from "react";
import { Link } from "react-router-dom";

const LinkToProfile = ({ id, children }) => {
  return <Link to={`/profile/${id}`}>{children}</Link>;
};

export default LinkToProfile;
