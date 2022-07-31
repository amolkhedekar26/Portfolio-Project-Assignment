import React from "react";
import "./PrimaryButtonWithIcon.css";

function PrimaryButtonWithIcon({ icon, children, onClick }) {
  return (
    <button className="primary-btn-with-icon" onClick={onClick}>
      <img src={icon} alt="" />
      <span>{children}</span>
    </button>
  );
}

export default PrimaryButtonWithIcon;
