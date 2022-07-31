import React, { forwardRef } from "react";
import "./TextInputRef.css";

function TextInputRef(
  { type, label, name, value, placeholder },
  ref
) {
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
        ref={(el) => (ref.current[name] = el)}
      />
    </div>
  );
}

export default forwardRef(TextInputRef);
