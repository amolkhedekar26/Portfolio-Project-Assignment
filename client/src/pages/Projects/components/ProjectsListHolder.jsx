import React from "react";
import ProjectsList from "../ProjectsList";
import BlankCanvas from "../../../assets/images/blank_canvas.svg";
import NoDataSVGIcon from "../../../assets/icons/no_data.svg";
import SearchSpinner from "../../../components/SearchSpinner/SearchSpinner";

function ProjectsListHolder({ projects, isLoading }) {
  let projectsContent = null;
  if (isLoading) {
    projectsContent = <SearchSpinner />;
  } else if (projects.length > 0) {
    projectsContent = <ProjectsList projects={projects} />;
  } else {
    projectsContent = (
      <div className="blank-canvas">
        <img src={NoDataSVGIcon} alt="blank canvas" />
      </div>
    );
  }

  return <>{projectsContent}</>;
}

export default ProjectsListHolder;
