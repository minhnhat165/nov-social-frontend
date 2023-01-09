import React from "react";

const Box = ({ header, className, children }) => {
  return (
    <div className={`flex flex-col rounded-xl bg-dark-regular ${className}`}>
      {header && (
        <div className="p-4 py-3 pb-0 text-2xl font-bold text-light-text-bold dark:text-dark-text-bold">
          {header}
        </div>
      )}
      {children}
    </div>
  );
};

export default Box;
