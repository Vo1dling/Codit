import React from "react";
import "./CustomInput.styles.css";

const CustomInput = (props) => {
  const {
    type,
    onChange,
    placeHolder,
    inputRef,
    name,
    className,
    required = false,
  } = props;
  if (type === "textarea")
    return (
      <textarea
        name={name}
        id={name}
        cols="40"
        rows="20"
        placeholder={placeHolder}
        className={className}
        style={{ resize: "none" }}
        ref={inputRef}
      />
    );
  else
    return (
      <input
        type={type}
        onInput={onChange}
        placeholder={placeHolder}
        ref={inputRef}
        className={className}
        required={required}
      />
    );
};
export default CustomInput;
