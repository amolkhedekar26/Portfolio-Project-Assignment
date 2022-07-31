import React from "react";
import "./PrimaryOutlineButtonWithIcon.css";

function PrimaryButtonWithIcon({ icon, children, onClick }) {
  return (
    <button className="primary-btn-outline-with-icon" onClick={onClick}>
      <img src={icon} alt="" />
      <span>{children}</span>
    </button>
  );
}

export default PrimaryButtonWithIcon;
