import React from "react";
import "./TextArea.css";

function TextArea({ label, name, value, placeholder }) {
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
        readOnly
      />
    </div>
  );
}

export default TextArea;
