import React from "react";

function SkillsContent({ children, isSearchActive }) {
  const className = isSearchActive
    ? "skills-content-transparent"
    : "skills-content";
  return <div className={className}>{children}</div>;
}

export default SkillsContent;
