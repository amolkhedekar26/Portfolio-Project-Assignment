import React from "react";
import "./PrimaryButton.css";

function PrimaryButton({ children, onClick }) {
  return <button className="primary-btn" onClick={onClick}>{children}</button>;
}

export default PrimaryButton;
