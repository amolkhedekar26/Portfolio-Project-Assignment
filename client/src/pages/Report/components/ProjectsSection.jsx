import React from "react";
import ProjectsList from "../../Projects/ProjectsList";
import Erroricon from "../../../assets/icons/erroricon.svg";

function ProjectsSection({ projects }) {
  let projectsContent = null;
  if (projects.length > 0) {
    projectsContent = <ProjectsList projects={projects} />;
  } else {
    projectsContent = (
      <div className="no-data">
        <img src={Erroricon} alt="" />
        <p>Oops ! No Projects found.</p>
      </div>
    );
  }
  return (
    <>
      <h5>Projects</h5>
      <div className="report-projects-div">{projectsContent}</div>
    </>
  );
}

export default ProjectsSection;
