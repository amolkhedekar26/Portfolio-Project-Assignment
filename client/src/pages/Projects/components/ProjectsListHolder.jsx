import React from "react";
import ProjectsList from "../ProjectsList";
import BlankCanvas from "../../../assets/images/blank_canvas.svg";

function ProjectsListHolder({ projects, isSearchActive }) {
  let projectsContent = null;
  if (projects.length > 0) {
    projectsContent = (
      <ProjectsList projects={projects} isSearchActive={isSearchActive} />
    );
  } else {
    projectsContent = (
      <div className="blank-canvas">
        <img src={BlankCanvas} alt="blank canvas" />
      </div>
    );
  }

  return <>{projectsContent}</>;
}

export default ProjectsListHolder;
