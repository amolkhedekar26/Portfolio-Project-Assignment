import React from "react";
import PrimaryButtonWithIcon from "../../../components/PrimaryButtonWithIcon/PrimaryButtonWithIcon";
import PlusIcon from "../../../assets/icons/plus.svg";
import { SearchInput } from "../../../components/SearchInput";
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
      {/* <SearchInput
        name="inputSearch"
        value=""
        placeholder="Search for projects"
      /> */}
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
