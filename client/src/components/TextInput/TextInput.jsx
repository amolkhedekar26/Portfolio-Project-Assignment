import React from "react";
import "./TextInput.css";

function TextInput({ type, label, name, value, placeholder }) {
  return (
    <div className="text-input-wrapper-main">
      <div className="label-container-text">
        <label htmlFor={name}>{label}</label>
      </div>
      <input
        className="input-main"
        type={type}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        readOnly
      />
    </div>
  );
}

export default TextInput;
