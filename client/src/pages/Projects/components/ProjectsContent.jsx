import React from "react";

function ProjectsContent({ children, isSearchActive }) {
  const className = isSearchActive
    ? "projects-content-transparent"
    : "projects-content";
  return <div className={className}>{children}</div>;
}

export default ProjectsContent;
