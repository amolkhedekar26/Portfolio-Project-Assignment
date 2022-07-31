import React from "react";
import "./PrimaryButtonWithIconDynamic.css";

function PrimaryButtonWithIconDynamic({
  icon,
  children,
  onClick,
  searchActive,
}) {
  const className = searchActive
    ? "primary-btn-dn-with-icon-transparent"
    : "primary-btn-dn-with-icon";
  return (
    <button className={className} onClick={onClick}>
      <img src={icon} alt="" />
      <span>{children}</span>
    </button>
  );
}

export default PrimaryButtonWithIconDynamic;
