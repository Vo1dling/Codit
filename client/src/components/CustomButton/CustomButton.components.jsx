import React from "react";

const CustomButton = ({
  text,
  children,
  onClick,
  id,
  value,
  className,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      id={id}
      value={value}
      className={className}
    >
      {children} {text}
    </button>
  );
};
export default CustomButton;
