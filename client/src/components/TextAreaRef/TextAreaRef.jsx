import React, { forwardRef } from "react";
import "./TextAreaRef.css";

function TextAreaRef({ label, name, value, placeholder }, ref) {
  return (
    <div className="textarea-input-wrapper-main">
      <div className="label-container-textarea">
        <label htmlFor={name}>{label}</label>
      </div>
      <textarea
        className="textarea-main"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        rows="5"
        ref={(el) => (ref.current[name] = el)}
      />
    </div>
  );
}

export default forwardRef(TextAreaRef);
