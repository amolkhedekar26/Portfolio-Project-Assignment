import React from "react";
import ProjectCard from "../../../components/ProjectCard/ProjectCard";

function ProjectsList({ projects }) {
  return (
    <>
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project.id}
            projectName={project.name}
            projectDescription={project.description}
            projectSkills={project.skills}
          />
        );
      })}
    </>
  );
}

export default ProjectsList;
