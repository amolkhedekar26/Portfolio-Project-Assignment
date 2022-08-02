import React from "react";
import ReactStars from "react-rating-stars-component";
import "./ProjectCard.css";

function ProjectCard({ projectName, projectDescription, projectSkills }) {
  return (
    <div className="project-card">
      <h6>{projectName}</h6>
      <p>{projectDescription}</p>
      <div className="project-skills">
        {projectSkills.map((skill, index) => (
          <span key={index}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
