import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

function ProjectsList({ projects, isSearchActive }) {
  return (
    <>
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project.id}
            projectName={project.name}
            projectDescription={project.description}
            projectSkills={project.skills}
            isSearchActive={isSearchActive}
          />
        );
      })}
    </>
  );
}

export default ProjectsList;
