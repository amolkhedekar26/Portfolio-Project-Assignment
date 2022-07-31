import React from "react";
import PlusIcon from "../../../assets/icons/plus.svg";
import AutoCompleteSearchInput from "../../../components/AutoCompleteSearchInput/AutoCompleteSearchInput";
import PrimaryButtonWithIconDynamic from "../../../components/PrimaryButtonWithIconDynamic/PrimaryButtonWithIconDynamic";

function ProjectsHeader({
  modalToggler,
  projectsArr,
  isSearchActive,
  setIsSearchActive,
}) {
  const arr = [];
  if (Array.isArray(projectsArr)) {
    projectsArr.forEach((skill) => {
      arr.push(skill.name);
    });
  }
  return (
    <header className="projects-header">
      <AutoCompleteSearchInput
        suggestions={arr}
        placeholder="Search for Projects"
        btnName="Project"
        modalToggler={modalToggler}
        setSearchActive={setIsSearchActive}
      />
      <PrimaryButtonWithIconDynamic
        icon={PlusIcon}
        onClick={modalToggler}
        searchActive={isSearchActive}
      >
        Add a Project
      </PrimaryButtonWithIconDynamic>
    </header>
  );
}

export default ProjectsHeader;
