import React from "react";
import "./CustomInput.styles.css";
const CustomInput = ({
  type,
  onChange,
  placeHolder,
  label,
  name,
  inputRef,
  required,
  autocomplete,
  value,
  checked,
  prop,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>
        {label}
        {required && <span className="red">*</span>}
      </label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeHolder}
        id={name}
        onClick={(e) => e.stopPropagation()}
        ref={inputRef}
        required={required}
        autoComplete={autocomplete}
        defaultValue={value}
        defaultChecked={checked}
        data-prop={prop}
      />
    </div>
  );
};
export default CustomInput;
